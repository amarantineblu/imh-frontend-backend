<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/modules', function () {
        return Inertia::render('modules');
    })->name('modules');

    Route::get('/admin-backup', function () {
        return Inertia::render('administer-backup');
    })->name('administer-backup');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/user-management.php';
require __DIR__ . '/contacts.php';
require __DIR__ . '/products.php';
require __DIR__ . '/sales.php';
require __DIR__ . '/expenses.php';
require __DIR__ . '/reports.php';
