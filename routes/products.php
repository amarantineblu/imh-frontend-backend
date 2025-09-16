<?php

use App\Brands;
use App\Category;
use App\Product;
use App\Template;
use App\Unit;
use App\Variation;
use App\Warranty;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;


Route::middleware(['auth', 'verified'])->group(function () {
    // Products routes
    Route::prefix('products')->group(function () {
      Route::get('/apis/{data_key}', function($data_key){
        $data = [
        'variations' =>  Variation::all()->toArray(),
        'templates' => Template::all()->toArray(),
        // 'stock_reports' => StockReport::all()->toArray(),
      ];
        if (Auth::user()){
          if (! array_key_exists($data_key, $data)) {
            # code...
            return response()->json(['error' => 'Invalid Data'], 400);
          }
          return response()->json(
            $data[$data_key]
          );
        }
      });

        // Route::get('/', function () {
        //     return Inertia::render('products/index', [
        //         'activeTab' => 'list'
        //     ]);
        // })->name('products.index');

        Route::get('/', [ProductController::class, 'index'])->name('products.index');


        Route::get('/list', function () {
        $products =  Product::all()->toArray();
            return Inertia::render('products/index', [
                'activeTab' => 'list',
                'products' => $products,
            ]);
        })->name('products.list');

        Route::get('/add', function () {
            return Inertia::render('products/index', [
                'activeTab' => 'add'
            ]);
        })->name('products.add');

        Route::get('/print-labels', function () {
					$products = Product::all()->toArray();
            return Inertia::render('products/index', [
                'activeTab' => 'print-labels',
								'products' => $products,
            ]);
        })->name('products.print-labels');

        Route::get('/variations', function () {
						$variations = Variation::all()->toArray();
						$templates = Template::all()->toArray();
            return Inertia::render('products/index', [
                'activeTab' => 'variations',
								'variatons' => $variations,
								'templates' => $templates
            ]);
        })->name('products.variations');

        Route::get('/import', function () {
            return Inertia::render('products/index', [
                'activeTab' => 'import'
            ]);
        })->name('products.import');

        Route::get('/import-opening-stock', function () {
            return Inertia::render('products/index', [
                'activeTab' => 'import-opening-stock'
            ]);
        })->name('products.import-opening-stock');

        Route::get('/selling-price-groups', function () {
            return Inertia::render('products/index', [
                'activeTab' => 'selling-price-group'
            ]);
        })->name('products.selling-price-groups');

        Route::get('/units', function () {
            return Inertia::render('products/index', [
                'activeTab' => 'units'
            ]);
        })->name('products.units');

        Route::get('/categories', function () {
            return Inertia::render('products/index', [
                'activeTab' => 'categories'
            ]);
        })->name('products.categories');

        Route::get('/brands', function () {
            return Inertia::render('products/index', [
                'activeTab' => 'brands'
            ]);
        })->name('products.brands');

        Route::get('/warranties', function () {
        $warranties =  Warranty::all()->toArray();
            return Inertia::render('products/index', [
                'activeTab' => 'warranties',
              'warranties' => $warranties
            ]);
        })->name('products.warranties');
    });
});
