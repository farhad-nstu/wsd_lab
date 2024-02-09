<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class FirstLoginPassworReset
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user=User::find(user()->id);
        if(
            !request()->routeIs('user.change.password') && 
            !request()->routeIs('user.update.password') && 
            !request()->routeIs('logout') &&  
            empty($user->last_login_at)
        ){
            return redirect()->to(route('user.change.password', auth()->id()))->with('reset_password', 'Please reset the password');
        }
        return $next($request);
    }
}
