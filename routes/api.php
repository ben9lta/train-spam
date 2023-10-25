<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SpamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::namespace('App\Http\Controllers\Api')->group(static function () {
    Route::post('/auth/login', [AuthController::class, 'login'])->name('auth.login');

    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        Route::prefix('spam')->name('spam.')->group(function () {
            Route::post('/check', [SpamController::class, 'check'])->name('check');
        });

    });
});
