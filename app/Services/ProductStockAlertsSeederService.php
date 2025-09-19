<?php

namespace App\Services;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class ProductStockAlertsSeederService extends Seeder
{
    public function run()
    {
        // Log::info("ProductStockAlertsSeederService::run() called.");
        if (!Schema::hasTable('product_stock_alerts')) {
            Log::info('Table product_stock_alerts does not exist. Skipping.');
            return;
        }

        // Source: variation_location_details (common in POS bundles)
        if (!Schema::hasTable('variation_location_details')) {
            Log::info('Source table variation_location_details missing. Attempting a fallback using variations or products.');
        }

        // Skip if already populated
        $count = DB::table('product_stock_alerts')->count();
        if ($count > 0) {
            Log::info('product_stock_alerts already has data. Skipping.');
            return;
        }

        // Best-effort query:
        if (Schema::hasTable('variation_location_details')) {
            $rows = DB::table('variation_location_details as vld')
                ->leftJoin('variations as v', 'vld.variation_id', '=', 'v.id')
                ->leftJoin('products as p', 'v.product_id', '=', 'p.id')
                ->leftJoin('business_locations as bl', 'vld.location_id', '=', 'bl.id')
                ->select(
                    DB::raw('COALESCE(p.name, CONCAT("Var-", v.id)) as product'),
                    DB::raw('COALESCE(bl.name, "Default Location") as location'),
                    DB::raw('vld.qty_available as stock'),
                    DB::raw('COALESCE(p.image, "") as img')
                )
                ->whereRaw('vld.qty_available <= COALESCE(v.stock_alert, 0) OR vld.qty_available <= 5') // threshold heuristic
                ->get();

            $inserted = 0;
            foreach ($rows as $r) {
                try {
                    DB::table('product_stock_alerts')->insert([
                        'product' => $r->product,
                        'location' => $r->location,
                        'stock' => $r->stock,
                        'img' => $r->img ?? '',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    $inserted++;
                } catch (\Exception $e) {
                    Log::error('product_stock_alert insert error: ' . $e->getMessage());
                }
            }

            // Log::info("ProductStockAlertsSeeder: inserted {$inserted} rows.");
            return;
        }

        // Fallback: produce a couple of placeholders to avoid empty UI
        DB::table('product_stock_alerts')->insert([
            [
                'product' => 'Placeholder product A',
                'location' => 'Main',
                'stock' => '0',
                'img' => '',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product' => 'Placeholder product B',
                'location' => 'Warehouse',
                'stock' => '2',
                'img' => '',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
        // Log::info('ProductStockAlertsSeeder: inserted 2 placeholder rows (fallback).');
    }
}