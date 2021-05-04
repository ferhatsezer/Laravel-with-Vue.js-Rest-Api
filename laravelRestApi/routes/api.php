<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


Route::post('login', [\App\Http\Controllers\ApiController::class, 'login']);
Route::post('register', [\App\Http\Controllers\ApiController::class, 'register']);
Route::middleware('auth:api')->group(function () {
    Route::get('all-users', [\App\Http\Controllers\ApiController::class, 'getAllUsers']);
    Route::get('users-reports', [\App\Http\Controllers\ApiController::class, 'getUsersReports']);
    Route::post('logout', [\App\Http\Controllers\ApiController::class, 'logout']);
});
