<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\CustomerGroupController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'SetSessionData', 'language', 'timezone', 'CheckUserLogin'])->group(function () {
    // Contacts routes
    Route::prefix('contacts')->group(function () {
        Route::get('/', [ContactController::class, 'indexSupplier'])
        ->name('contacts.index');
        Route::get('/suppliers', [ContactController::class, 'indexSupplier'])
        ->name('contacts.suppliers');

        Route::get('/customers', [ContactController::class, 'indexCustomer'])
        ->name('contacts.customers');

        Route::get('/customers-groups', [CustomerGroupController::class, 'index'])
        ->name('contacts.customers-groups');
        Route::post('/customers-groups', [CustomerGroupController::class, 'store'])
        ->name('contacts.customers-groups.store');
        Route::patch('/customers-groups/{id}', [CustomerGroupController::class, 'update'])
        ->name('contacts.customers-groups.update');

        Route::get('/import-contacts', [ContactController::class, 'getImportContacts'])
        ->name('contacts.import-contacts');
    });
});
