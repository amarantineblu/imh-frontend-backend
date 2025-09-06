<?php

use App\PosTransaction;
use App\Transaction;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('sales')->group(function () {
      Route::get( 'api/transactions', function () {
          $transactions = PosTransaction::all();
          return response()->json($transactions);
      })->name('sales.api-transactions');

        Route::get('/', function () {
            $transactions = PosTransaction::all();
            // \Log::info('Transactions from DB:', $transactions->toArray());
            return Inertia::render('sales/index', [
                'activeTab' => 'all-sales',
                'transactions' => $transactions,

            ]);
        })->name('sales.all-sales');

        // All Sales
        Route::get('/all', function () {
            return Inertia::render('sales/index', [
                'activeTab' => 'all-sales'
            ]);
        })->name('sales.all-sales');

        // Add Sale
        Route::get('/add', function () {
            return Inertia::render('sales/index', [
                'activeTab' => 'add-sale'
            ]);
        })->name('sales.add');

        // List POS
        Route::get('/pos-list', function () {
            return Inertia::render('sales/index', [
                'activeTab' => 'list-pos',
            ]);
        })->name('sales.list-pos');

        // POS
        Route::get('/pos', function () {
            return Inertia::render('sales/index', [
                'activeTab' => 'pos'
            ]);
        })->name('sales.pos');

        // Add Draft
        Route::get('/add-draft', function () {
            return Inertia::render('sales/index', [
                'activeTab' => 'add-draft'
            ]);
        })->name('sales.add-draft');

        // List Drafts
        Route::get('/drafts', function () {
            return Inertia::render('sales/index', [
                'activeTab' => 'list-drafts'
            ]);
        })->name('sales.list-drafts');

        // Add Quotation
        Route::get('/add-quotation', function () {
            return Inertia::render('sales/index', [
                'activeTab' => 'add-quotation'
            ]);
        })->name('sales.add-quotation');

        // List Quotations
        Route::get('/quotations', function () {
            return Inertia::render('sales/index', [
                'activeTab' => 'list-quotations'
            ]);
        })->name('sales.list-quotations');

        // List Sell Return
        Route::get('/returns', function () {
            return Inertia::render('sales/index', [
                'activeTab' => 'sell-return'
            ]);
        })->name('sales.sell-return');

        // Shipments
        Route::get('/shipments', function () {
            return Inertia::render('sales/index', [
                'activeTab' => 'shipments'
            ]);
        })->name('sales.shipments');

        // Discounts
        Route::get('/discounts', function () {
            return Inertia::render('sales/index', [
                'activeTab' => 'discounts'
            ]);
        })->name('sales.discounts');

        // Import Sales
        Route::get('/import', function () {
            return Inertia::render('sales/index', [
                'activeTab' => 'import'
            ]);
        })->name('sales.import-sales');
    });
});

