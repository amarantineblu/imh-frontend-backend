<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductStockAlertTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
         $data = [
          [ 'product' => 'Cow Leg', 'location' => 'Calabar', 'img' => '/img/avatar1.png', 'stock' => '-' ],
          [ 'product' => 'Goat Meat', 'location' => 'Enugu', 'img' => '/img/avatar2.png', 'stock' => '-' ],
          [ 'product' => 'Turkey', 'location' => 'Lagos', 'img' => '/img/avatar3.png', 'stock' => '-' ],
        ];

        DB::table('product_stock_alerts')->truncate();
        DB::table('product_stock_alerts')->insert($data);
    }
}
