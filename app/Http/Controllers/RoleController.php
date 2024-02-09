<?php

namespace App\Http\Controllers;

use App\Enums;
use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;
use RealRashid\SweetAlert\Facades\Alert;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $roles = Role::where(['guard_name' => $request->guard])->get();
        $guards = Enums::GUARDS;
        return view("layouts.admin.pages.roles.index", compact('guards', 'request', 'roles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $all_permissions = Permission::where(['guard_name' => $request->guard])->get();
        $group_permissions = $all_permissions->groupBy('group_name');
        $guards = Enums::GUARDS;
        return view("layouts.admin.pages.roles.create", compact(
            'all_permissions',
            'group_permissions',
            'guards'
        ));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            "name" => [
                "required", "string",
                Rule::unique('roles')
                    ->where('guard_name', $request->guard_name)
            ]
        ]);
        try {
            DB::beginTransaction();
            $role = Role::create([
                'name' => $request->name,
                'guard_name' => $request->guard_name
            ]);
            $permissions = $request->input('permissions');
            if (!empty($permissions)) {
                $role->syncPermissions($permissions);
            }
            DB::commit();
            toast('It has been created.', 'success')->timerProgressBar();
            return redirect()->back();
        } catch (\Exception $e) {
            DB::rollback();
            Alert::error('Somthing is wrong!', $e->getMessage(), true);
            return redirect()->back();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        $role = Role::with('permissions')->where('id', $id)->first();
        $checking = ($request->guard == $role->guard_name || !$request->guard) ? true : false;
        $all_permissions = Permission::where(['guard_name' => $request->guard ? $request->guard : $role->guard_name])->get();
        $group_permissions = $all_permissions->groupBy('group_name');
        $guards = Enums::GUARDS;
        return view("layouts.admin.pages.roles.edit", compact('role', 'all_permissions', 'group_permissions', 'guards', 'checking'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => [
                "required", "string",
                Rule::unique('roles')
                    ->ignore($id)
                    ->where('guard_name', $request->guard_name)
            ],
        ]);
        try {
            DB::beginTransaction();
            $role = Role::with('permissions')->where('id', $id)->first();
            $role->update([
                'name' => $request->name,
                'guard_name' => $request->guard_name
            ]);
            $permissions = $request->input('permissions');
            if (!empty($permissions)) {
                if ($role->permissions) {
                    $role->permissions()->detach();
                }
                $role->syncPermissions($permissions);
            }
            DB::commit();
            toast('It has been updated.', 'success')->timerProgressBar();
            return redirect()->back();
        } catch (\Exception $e) {
            DB::rollback();
            Alert::error('Somthing is wrong!', $e->getMessage(), true);
            return redirect()->back();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
