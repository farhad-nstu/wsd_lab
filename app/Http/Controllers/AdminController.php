<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Auth;
use App\Rules\CheckOldPassword;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use RealRashid\SweetAlert\Facades\Alert;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        return view('layouts.admin.pages.dashboard');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
       $admin = Admin::where('id', $id)->first();
       return view('layouts.admin.pages.users.show', compact('admin'));
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
    public function screen_lock(Request $request, $id)
    {
        Auth::logout();
        $admin = Admin::find($id);
        return view('auth.pages.admin_lock_screen', compact('admin'));
    }
    public function change_password($id)
    {
        return view("layouts.admin.pages.users.change_password", compact('id'));
    }
    public function password_update(Request $request, $id)
    {
        $this->validate($request, [
            'current_password' => ['required', new CheckOldPassword($id)],
            'new_password' => 'min:6|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'min:6',
        ]);
        $data['password'] = Hash::make($request->new_password);
        Auth::guard('admin')->logoutOtherDevices($request->current_password);
        Admin::where('id',$id)->update($data);
        try {
            toast('It has been updated.', 'success')->timerProgressBar();
            return redirect()->back();
        } catch (\Exception $e) {
            Alert::error('Somthing is wrong!', $e->getMessage(), true);
            return redirect()->back();
        }
    }
    public function admin_profile($id)  {
        $admin = Admin::where('id', $id)->first();
        return view('layouts.admin.pages.users.user_profile', compact('admin'));
    }

    public function update_admin_profile(Request $request)
    {
        $this->validate($request, [
            "name" => "required|string",
            "avatar" => "nullable|image",
            "email" => "required|email|unique:" . with(new Admin())->getTable() . ",email," . $request->admin_id,
            "mobile" => "nullable|numeric|unique:" . with(new Admin())->getTable() . ",mobile," . $request->admin_id,

        ]);
        $data = $request->except('avatar', '_token', '_method');
        $admin = Admin::where('id', $request->admin_id)->first();
        if ($request->file('avatar')) {
            if ($admin->avatar && file_exists(public_path(Storage::url($admin->avatar)))) {
                Storage::disk('public')->delete($admin->avatar);
            }
            $avatar = time() . "_" . Str::random('20') . "." . $request->avatar->extension();
            $data['avatar'] = $request->avatar->storeAs('admins', $avatar, 'public');
        }
        try {
            DB::beginTransaction();
            $admin->update($data);
            DB::commit();
            toast('It has been updated.', 'success')->timerProgressBar();
            return redirect()->back();
        } catch (\Exception $e) {
            DB::rollback();
            Alert::error('Somthing is wrong!', $e->getMessage(), true);
            return redirect()->back();
        }
    }
}
