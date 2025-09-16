<?php

use App\PosTransaction;
use App\Transaction;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('sales')->group(function () {
      

        Route::get('/', function () {
            // \Log::info('Transactions from DB:', $transactions->toArray());
            return Inertia::render('sales/index', [
              'activeTab' => 'all-sales',
            ]);
        })->name('sales.all-sales');

        // All Sales
        Route::get('/all', function () {
            $sales =  App\Transaction::where('type', 'sell')->get()->toArray();
            return Inertia::render('sales/index', [
                'activeTab' => 'all-sales',
                'sales' => $sales,
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
            $list_pos =  App\PosTransaction::all()->toArray();
            return Inertia::render('sales/index', [
                'activeTab' => 'list-pos',
                'list_pos' => $list_pos,
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
            $drafts =  App\Transaction::where('type', 'sales_order')->where('status', 'draft')->get()->toArray();
            return Inertia::render('sales/index', [
                'activeTab' => 'add-draft',
                'drafts' => $drafts,
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
            $quotations =  App\Transaction::where('type', 'sales_order')->get()->toArray();
            return Inertia::render('sales/index', [
                'activeTab' => 'list-quotations',
                'quotations' => $quotations,
            ]);
        })->name('sales.list-quotations');

        // List Sell Return
        Route::get('/returns', function () {
            $returns =  App\Transaction::where('type', 'sell_return')->get()->toArray();
            return Inertia::render('sales/index', [
                'activeTab' => 'sell-return',
                'returns' => $returns,
            ]);
        })->name('sales.sell-return');

        // Shipments
        Route::get('/shipments', function () {
            $shipments =  App\PendingShipment::all()->toArray();
            return Inertia::render('sales/index', [
                'activeTab' => 'shipments',
                'shipments' => $shipments,
            ]);
        })->name('sales.shipments');

        // Discounts
        Route::get('/discounts', function () {
            $discounts =  App\Transaction::where('type', 'sell')->where('status', 'final')->get()->toArray();
            return Inertia::render('sales/index', [
                'activeTab' => 'discounts',
                'discounts' => $discounts,
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

