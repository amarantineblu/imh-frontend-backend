<?php

namespace App\Services;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class StockReportsSeederService extends Seeder
{
    public function run()
    {
        if (!Schema::hasTable('stock_reports')) {
            Log::info('Table stock_reports does not exist. Skipping.');
            return;
        }

        if (!Schema::hasTable('variation_location_details')) {
            Log::info('Source table variation_location_details missing. Skipping stock_reports seed.');
            return;
        }

        $count = DB::table('stock_reports')->count();
        if ($count > 0) {
            Log::info('stock_reports already has data. Skipping.');
            return;
        }

        // Build a per-variation/location report
        $rows = DB::table('variation_location_details as vld')
            ->leftJoin('variations as v', 'vld.variation_id', '=', 'v.id')
            ->leftJoin('products as p', 'v.product_id', '=', 'p.id')
            ->leftJoin('product_variations as pv', function ($join) {
                $join->on('pv.variation_id', '=', 'v.id');
            }) // optional
            ->leftJoin('business_locations as bl', 'vld.location_id', '=', 'bl.id')
            ->select(
                DB::raw('COALESCE(v.sku, CONCAT("SKU-", v.id)) as sku'),
                DB::raw('COALESCE(p.name, "Product") as product'),
                DB::raw('COALESCE(v.name, "") as variation'),
                DB::raw('COALESCE(p.category_id, "") as category'),
                DB::raw('COALESCE(bl.name, "Default") as location'),
                DB::raw('COALESCE(v.default_sell_price, v.sell_price, "") as unitSellingPrice'),
                DB::raw('vld.qty_available as currentStock'),
                DB::raw('0 as currentStockValuePurchase'),
                DB::raw('0 as currentStockValueSale'),
                DB::raw('0 as potentialProfit'),
                DB::raw('(SELECT SUM(tsl.quantity) FROM transaction_sell_lines AS tsl WHERE tsl.variation_id = v.id) as totalUnitSold'),
                DB::raw('0 as totalUnitTransferred'),
                DB::raw('0 as totalUnitAdjusted')
            )
            ->get();

        $inserted = 0;
        foreach ($rows as $r) {
            try {
                DB::table('stock_reports')->insert([
                    'sku' => $r->sku,
                    'product' => $r->product,
                    'variation' => $r->variation,
                    'category' => (string)$r->category,
                    'location' => $r->location,
                    'unitSellingPrice' => $r->unitSellingPrice,
                    'currentStock' => $r->currentStock,
                    'currentStockValuePurchase' => $r->currentStockValuePurchase,
                    'currentStockValueSale' => $r->currentStockValueSale,
                    'potentialProfit' => $r->potentialProfit,
                    'totalUnitSold' => $r->totalUnitSold ?? 0,
                    'totalUnitTransferred' => $r->totalUnitTransferred ?? 0,
                    'totalUnitAdjusted' => $r->totalUnitAdjusted ?? 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                $inserted++;
            } catch (\Exception $e) {
                Log::error('stock_reports insert failed: ' . $e->getMessage());
            }
        }

        // Log::info("StockReportsSeeder: inserted {$inserted} rows into stock_reports.");
    }
}