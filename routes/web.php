<?php

use App\Http\Controllers\AuthSessionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::redirect('/', '/login');
Route::group(['middleware' => 'guest:admin'], function () {
    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::get('/login', [AuthSessionController::class, 'show_admin_login_form'])->name('login');
        Route::post('/login', [AuthSessionController::class, 'admin_login']);
    });
});

