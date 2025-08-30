<?php

use App\Http\Controllers\ManageUserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SalesCommissionAgentController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'SetSessionData', 'language', 'timezone', 'CheckUserLogin'])->group(function () {
    Route::prefix('user-management')->group(function () {
        Route::get('/', [ManageUserController::class, 'index'])
        ->name('user-management.index');
        Route::get('/users', [ManageUserController::class, 'index'])
        ->name('user-management.users');

        Route::get('/roles', [RoleController::class, 'index'])
        ->name('user-management.roles');

        Route::get('/sales-commissions-agents', [SalesCommissionAgentController::class, 'index'])
        ->name('user-management.sales-commissions-agents');
        Route::post('/sales-commissions-agents', [SalesCommissionAgentController::class, 'store'])
        ->name('user-management.sales-commissions-agents.store');
    });
});
