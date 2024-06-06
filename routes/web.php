<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ItemController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Item Routes

Route::get('/item-form', [ItemController::class, 'create'])->name('item-form');

Route::get('/item-index', [ItemController::class, 'view'])->name('item-index');

Route::post('/create', [ItemController::class, 'store']);

Route::get('/items', [ItemController::class, 'index']);

Route::delete('/items/{id}', [ItemController::class, 'destroy']);

Route::put('/items/{id}', [ItemController::class, 'updateStatus']);

Route::get('/edit-item', [ItemController::class, 'edit'])->name('edit.item');

Route::put('/items/{id}', [ItemController::class, 'update']);

require __DIR__.'/auth.php';
