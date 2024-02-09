<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;
use RealRashid\SweetAlert\Facades\Alert;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Artisan;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $permissions=Permission::paginate(50)->withQueryString();

        return view("layouts.admin.pages.permission.index",compact('permissions'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return view("layouts.admin.pages.permission.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $this->validate($request, [
            'name' => 'required|string',
            'group_name' => 'required|string',
            'guard_name' => 'required|string',
        ]);

        $data=$request->except('_token','_method');

        $permission=Permission::create($data);

        if($request->guard_name=='web'){
            $admin = Role::where(['name' => 'Buyer', 'guard_name' => 'web'])->first();

            $admin->givePermissionTo($permission);
        }
        else{
            $s_admin = Role::where(['name' => 'Seller', 'guard_name' => 'admin'])->first();

            $s_admin->givePermissionTo($permission);
        }
        Artisan::call('optimize:clear');


        toast('It has been created.', 'success')->timerProgressBar();
            return redirect()->back();
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
    public function edit($id)
    {
        //
        $permission=Permission::find($id);

        return view("layouts.admin.pages.permission.edit",compact('permission'));
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
        //
        $this->validate($request, [
            'name' => 'required|string',
            'group_name' => 'required|string',
            'guard_name' => 'required|string',
        ]);

         $permission=Permission::find($id);

          $permission->name = $request->name;
          $permission->group_name = $request->group_name;
          $permission->guard_name = $request->guard_name;
          $permission->updated_at = now()->format('Y-m-d H:i:s');
          $permission->save();

        toast('It has been updated.', 'success')->timerProgressBar();
            return redirect()->back();
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
