<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SpamController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [ProfileController::class, 'dashboard'])->name('dashboard');

    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('spam')->name('spam.')->group(function () {
        Route::get('/train', [SpamController::class, 'train'])->name('train');
        Route::get('/checker', [SpamController::class, 'checker'])->name('checker');
        Route::post('/training', [SpamController::class, 'uploadAndTraining'])->name('training');
        Route::post('/check', [SpamController::class, 'check'])->name('check');
        Route::post('/paginate/{page}', [SpamController::class, 'paginateUserMessages'])->name('paginate');
        Route::post('/{spamMessage}', [SpamController::class, 'update'])->name('update');
    });

});

require __DIR__.'/auth.php';
