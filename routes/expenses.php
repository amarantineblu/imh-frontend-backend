<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified'])->group(function () {
    // Expenses routes
    Route::prefix('expenses')->group(function () {
        Route::get('/', function () {
            return Inertia::render('expenses/index', [
                'activeTab' => 'list'
            ]);
        })->name('expenses.index');

        Route::get('/list', function () {
            return Inertia::render('expenses/index', [
                'activeTab' => 'list'
            ]);
        })->name('expenses.list-expenses');

        Route::get('/add', function () {
            return Inertia::render('expenses/index', [
                'activeTab' => 'add'
            ]);
        })->name('expenses.add');

        Route::get('/categories', function () {
            return Inertia::render('expenses/index', [
                'activeTab' => 'categories'
            ]);
        })->name('expenses.categories');
    });
});
