<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('settings')->group(function () {
        // Profile routes
        Route::get('profile', function () {
            return Inertia::render('settings/index', [
                'activeTab' => 'profile'
            ]);
        })->name('profile.edit');
        Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // Password routes
        Route::get('password', function () {
            return Inertia::render('settings/index', [
                'activeTab' => 'password'
            ]);
        })->name('password.edit');
        Route::put('password', [PasswordController::class, 'update'])->name('password.update');

        // Appearance
        Route::get('appearance', function () {
            return Inertia::render('settings/index', [
                'activeTab' => 'appearance'
            ]);
        })->name('settings.appearance');

        // Business (default)
        Route::get('/', function () {
            return Inertia::render('settings/index', [
                'activeTab' => 'business'
            ]);
        })->name('settings.index');
        Route::get('business', function () {
            return Inertia::render('settings/index', [
                'activeTab' => 'business'
            ]);
        })->name('settings.business');

        // // Locations
        Route::get('locations', function () {
            return Inertia::render('settings/index', [
                'activeTab' => 'locations'
            ]);
        })->name('settings.locations');

        // // Invoice
        Route::get('invoice', function () {
            return Inertia::render('settings/index', [
                'activeTab' => 'invoice'
            ]);
        })->name('settings.invoice');

        // // Notifications
        Route::get('/barcode', function () {
            return Inertia::render('settings/index', [
                'activeTab' => 'barcode'
            ]);
        })->name('settings.barcode');

        // // Users
        Route::get('tax', function () {
            return Inertia::render('settings/index', [
                'activeTab' => 'tax'
            ]);
        })->name('settings.tax');

        Route::get('receipt', function () {
            return Inertia::render('settings/index', [
                'activeTab' => 'receipt'
            ]);
        })->name('settings.receipt');
    });
});
