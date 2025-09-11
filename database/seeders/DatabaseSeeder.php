<?php

namespace Database\Seeders;

use App\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            BarcodesTableSeeder::class,
            PermissionsTableSeeder::class,
            CurrenciesTableSeeder::class,
            PosTransactionTableSeeder::class,
            SalesPaymentTableSeeder::class,
            ProductStockAlertTableSeeder::class,
            PurchasePaymentTableSeeder::class,
            SalesOrderTableSeeder::class,
            PendingShipmentTableSeeder::class,
            WarrantiesTableSeeder::class,
            BrandsTableSeeder::class,
            CategoriesTableSeeder::class,
            UnitsTableSeeder::class,
            ProductsTableSeeder::class,
            VariationsTableSeeder::class,
        ]);
    }
}
