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
  Route::get('dashboard/apis', function()
  {
      $totalSales = \DB::table('transactions')
          ->where('type', 'sell')
          ->sum('final_total');
  
      $netSales = \DB::table('transactions')
          ->where('type', 'sell')
          ->where('status', 'final')
          ->sum('final_total'); // Adjust for returns/discounts as needed
  
      $invoiceDue = \DB::table('transactions')
          ->where('type', 'sell')
          ->where('payment_status', '!=', 'paid')
          ->count();
  
      $totalSalesReturned = \DB::table('transactions')
          ->where('type', 'sell_return')
          ->sum('final_total');
  
      $totalPurchases = \DB::table('transactions')
          ->where('type', 'purchase')
          ->sum('final_total');
  
      $purchaseDue = \DB::table('transactions')
          ->where('type', 'purchase')
          ->where('payment_status', '!=', 'paid')
          ->count();
  
      $totalPurchasesReturned = \DB::table('transactions')
          ->where('type', 'purchase_return')
          ->sum('final_total');
  
      $expenses = \DB::table('transactions')
          ->where('type', 'expense')
          ->sum('final_total');
  
      return response()->json([
          'Total Sales' => $totalSales,
          'Net Sales' => $netSales,
          'Invoice Due' => $invoiceDue,
          'Total Sales Returned' => $totalSalesReturned,
          'Total Purchases' => $totalPurchases,
          'Purchase Due' => $purchaseDue,
          'Total Purchases Returned' => $totalPurchasesReturned,
          'Expenses' => $expenses,
      ]);
  })->name('apis');

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
