<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Rules\CheckOldPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use RealRashid\SweetAlert\Facades\Alert;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = User::with('roles')->when($request->email != null, function ($q) use ($request) {
            return $q->where('email', $request->get('email'));
        })->paginate(50)->withQueryString();
        $requests=$request->all();
        return view("layouts.admin.pages.users.index", compact('users','requests'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view("layouts.admin.pages.users.create");
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
            "name" => "required|string",
            "avatar" => "nullable|mimes:image|max:1024",
            "email" => "required|string|unique:users,email",
            'password' => 'min:6|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'min:6',
            "mobile" => "nullable|numeric|unique:users,mobile",
            "status" => "required",
            "roles"    => "required|array",
            "roles.*"  => "required",
        ]);
        $data = $request->except('roles',  'avatar', 'password');
        if ($request->file('avatar')) {
            $avatar = time() . "_" . Str::random('20') . "." . $request->avatar->extension();
            $data['avatar'] = $request->avatar->storeAs('users', $avatar, 'public');
        }
        $data['password'] = Hash::make($request->password);
        $data['status_date'] = now()->format('Y-m-d H:i:s');

        try {
            DB::beginTransaction();
            $user = User::create($data);
            $user->assignRole($request->roles);
            if($request->permissions){
                $user->givePermissionTo($request->permissions);
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
    public function screen_lock(Request $request, $id)
    {
        Auth::logout();
        $user = User::find($id);
        return view('auth.pages.lock_screen', compact('user'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::where('id', $id)->first();
        return view('layouts.pages.users.show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::with("roles")->where('id', $id)->first();
        return view("layouts.admin.pages.users.edit", compact('user'));
    }

    public function user_profile($id)
    {
        $user = User::with("roles")->where('id', $id)->first();
        return view('layouts.pages.users.user_profile', compact('user'));
    }

    public function update_user_profile(Request $request)
    {
        $this->validate($request, [
            "name" => "required|string",
            "avatar" => "nullable|image",
            "email" => "required|email|unique:" . with(new User())->getTable() . ",email," . $request->user_id,
            "mobile" => "nullable|numeric|unique:" . with(new User())->getTable() . ",mobile," . $request->user_id,

        ]);
        $data = $request->except('avatar', '_token', '_method');
        $user = User::with('roles')->where('id', $request->user_id)->first();
        if ($request->file('avatar')) {
            if ($user->avatar && file_exists(public_path(Storage::url($user->avatar)))) {
                Storage::disk('public')->delete($user->avatar);
            }
            $avatar = time() . "_" . Str::random('20') . "." . $request->avatar->extension();
            $data['avatar'] = $request->avatar->storeAs('users', $avatar, 'public');
        }
        try {
            DB::beginTransaction();
            $user->update($data);
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => "required|string",
            "avatar" => "nullable|image",
            "email" => "required|email|unique:" . with(new User())->getTable() . ",email," . $id,
            "mobile" => "nullable|numeric|unique:" . with(new User())->getTable() . ",mobile," . $id,
            "roles"    => "required|array",
            "roles.*"  => "required",
        ]);
        $data = $request->except('roles', 'avatar', '_token', '_method');
        $user = User::with('roles')->where('id', $id)->first();
        if ($request->file('avatar')) {
            if ($user->avatar && file_exists(public_path(Storage::url($user->avatar)))) {
                Storage::disk('public')->delete($user->avatar);
            }
            $avatar = time() . "_" . Str::random('20') . "." . $request->avatar->extension();
            $data['avatar'] = $request->avatar->storeAs('users', $avatar, 'public');
        }
        try {
            DB::beginTransaction();
            $user->update($data);
            $roles = $request->input('roles');

            if (!empty($roles)) {
                if ($user->roles) {
                    $user->roles()->detach();
                }
                $user->syncRoles($roles);
            }

            $permissions = $request->input('permissions');
           // dd($permissions);
                if ($user->permissions) {
                    $user->permissions()->detach();
                }
                $user->syncpermissions($permissions);



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
     * change user password the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function change_password($id)
    {
        return view("layouts.pages.users.change_password", compact('id'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function password_update(Request $request, $id)
    {
        $this->validate($request, [
            'current_password' => ['required', new CheckOldPassword($id)],
            'new_password' => 'min:6|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'min:6',
        ]);
        $data['password'] = Hash::make($request->new_password);
        $data['last_login_at'] = now()->format('Y-m-d H:i:s');
        Auth::guard('web')->logoutOtherDevices($request->current_password);
        User::where('id', $id)->update($data);
        try {
            toast('It has been updated.', 'success')->timerProgressBar();
            return redirect()->back();
        } catch (\Exception $e) {
            Alert::error('Somthing is wrong!', $e->getMessage(), true);
            return redirect()->back();
        }
    }

    /**
     * change permissions the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function permissions($id)
    {
        $user = User::where('id', $id)->first();
        $all_permissions = Permission::where('guard_name', 'web')->get();
        $group_permissions = $all_permissions->groupBy('group_name');
        return view("layouts.admin.pages.users.permissions_edit", compact('user', 'all_permissions', 'group_permissions'));
    }

    public function permissions_update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            $permissions = $request->input('permissions');

            if (!empty($permissions)) {
                if ($user->permissions) {
                    $user->permissions()->detach();
                }
                $user->syncPermissions($permissions);
            }
            toast('It has been updated.', 'success')->timerProgressBar();
            return redirect()->back();
        } catch (\Exception $e) {
            Alert::error('Somthing is wrong!', $e->getMessage(), true);
            return redirect()->back();
        }
    }
    /**
     * change status the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function status($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->update(['status' => ($user->status ? 0 : 1)]);
            toast('It has been updated.', 'success')->timerProgressBar();
            return redirect()->back();
        } catch (\Exception $e) {
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
