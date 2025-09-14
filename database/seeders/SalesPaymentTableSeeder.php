<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SalesPaymentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
          [ 'customer' => 'Aisha Doe', 'date' => '13/01/2025', 'invoice' => '37364784', 'amount' => '306,678.00' ],
          [ 'customer' => 'Chukwuemeka', 'date' => '13/01/2025', 'invoice' => '465374846', 'amount' => '100,900.00' ],
          [ 'customer' => 'Suleiman', 'date' => '13/01/2025', 'invoice' => '45243637', 'amount' => '2,004,598.00' ],
        ];

        DB::table('sales_payments')->truncate();
          DB::table('sales_payments')->insert($data);
    }
}
