<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    // Reports routes
    Route::prefix('reports')->group(function () {
        Route::get('/apis', function(){
            $customer_supplier_report = App\SupplierCustomerReport::all()->toArray();
            $data = [
                'customer_supplier_report' => $customer_supplier_report,
            ];
            return response()->json($data);

        });
        Route::get('/', function () {
            $summaryData = [];
            $profitLossData = [];   
            $profitSummary = [];
            return Inertia::render('reports/index', [
                'activeTab' => 'profit-loss'
            ]);
        })->name('reports.index');

        Route::get('/profit-loss', function () {
            // $summaryData = 
            return Inertia::render('reports/index', [
                'activeTab' => 'profit-loss'
            ]);
        })->name('reports.profit-loss');

        Route::get('/purchase-sale', function () {
            return Inertia::render('reports/index', [
                'activeTab' => 'purchase-sale'
            ]);
        })->name('reports.purchase-sale');

        Route::get('/tax-report', function () {
            // $input_tax_column = 
            return Inertia::render('reports/index', [
                'activeTab' => 'tax-report'
            ]);
        })->name('reports.tax-report');

        Route::get('/supplier-customer', function () {
            return Inertia::render('reports/index', [
                'activeTab' => 'supplier-customer',
                
            ]);
        })->name('reports.supplier-customer');

        Route::get('/customer-group', function () {
            // $customer_group_report = 
            return Inertia::render('reports/index', [
                'activeTab' => 'customer-group'
            ]);
        })->name('reports.customer-group');

        Route::get('/stock-report', function () {
            $stockData = App\Product::with('category', 'brand')->get()->toArray();
            return Inertia::render('reports/index', [
                'activeTab' => 'stock-report',
                'stockData' => $stockData,
            ]);
        })->name('reports.stock-report');

        Route::get('/trending-products', function () {
            $trendingProducts = App\Product::with('category', 'brand')->get()->toArray();
            return Inertia::render('reports/index', [
                'activeTab' => 'trending-products',
                'trendingProducts' => $trendingProducts,
            ]);
        })->name('reports.trending-products');

        Route::get('/items-report', function () {
            $items = App\Product::with('category', 'brand')->get()->toArray();
            return Inertia::render('reports/index', [
                'activeTab' => 'items-report',
                'items' => $items,
            ]);
        })->name('reports.items-report');

        Route::get('/product-purchase', function () {
            $purchasePaymentData = App\PurchasePayment::all()->toArray();
            return Inertia::render('reports/index', [
                'activeTab' => 'product-purchase',
                'purchasePaymentData' => $purchasePaymentData
            ]);
        })->name('reports.product-purchase');

        Route::get('/product-sell', function () {
            // $detailedData = 
            return Inertia::render('reports/index', [
                'activeTab' => 'product-sell'
            ]);
        })->name('reports.product-sell');

        Route::get('/purchase-payment', function () {
            $purchasePaymentData = App\PurchasePayment::with('purchase')->get()->toArray();
            return Inertia::render('reports/index', [
                'activeTab' => 'purchase-payment',
                'purchasePayment' => $purchasePaymentData,
            ]);
        })->name('reports.purchase-payment');

        Route::get('/sell-payment', function () {
            // \Log::info('Sell Payment route hit');
            $salesPaymentData = App\SalePayment::with('sale')->get()->toArray();
            return Inertia::render('reports/index', [
                'activeTab' => 'sell-payment',
                'salesPayment' => $salesPaymentData,
            ]);
        })->name('reports.sell-payment');

        Route::get('/expense-report', function () {
            $chartData = App\Expense::selectRaw('DATE(created_at) as date, SUM(amount) as total')
                ->groupBy('date')
                ->orderBy('date', 'ASC')
                ->get()
                ->toArray();
            $expenseData = App\Expense::with('category')->get()->toArray();
            return Inertia::render('reports/index', [
                'activeTab' => 'expense-report',
                'expense' => $expenseData,
                'chartData' => $chartData,
            ]);
        })->name('reports.expense-report');

        Route::get('/register-report', function () {
            $register = App\CashRegister::with('user')->get()->toArray();
            return Inertia::render('reports/index', [
                'activeTab' => 'register-report',
                'register' => $register,
            ]);
        })->name('reports.register-report');

        Route::get('/sales-representative', function () {
            $salesData = App\Sale::with('user')->get()->toArray();  
            return Inertia::render('reports/index', [
                'activeTab' => 'sales-representative',
                'sales' => $salesData,
            ]);
        })->name('reports.sales-representative');

        Route::get('/activity-log', function () {
            $activity_logs =  App\ActivityLog::all()->toArray();
            return Inertia::render('reports/index', [
                'activeTab' => 'activity-log',
                'activity_logs' => $activity_logs,
            ]);
        })->name('reports.activity-log');
    });
});
