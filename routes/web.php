<?php

use App\PendingShipment;
use App\ProductStockAlert;
use App\PurchasePayment;
use App\SalesOrder;
use App\SalesPayment;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/apis/dashboard', function() {
    
      $data = [
        
      ];
      Log::info('Transactions API:', $data);
      return response()->json($data);
    });
    Route::get('dashboard', function () {
    $salesPayment = SalesPayment::all()->toArray();
      $purchasePayment = PurchasePayment::all()->toArray();
      $productStockAlert = ProductStockAlert::all()->toArray();
      $salesOrder = SalesOrder::all()->toArray();
      $pendingShipment = PendingShipment::all()->toArray();
        return Inertia::render('dashboard',[
          'sales_payments' => $salesPayment,
          'purchase_payments' => $purchasePayment,
          'product_stock_alerts' => $productStockAlert,
          'sales_orders' => $salesOrder,
          'pending_shipments' => $pendingShipment,
        ]);
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
