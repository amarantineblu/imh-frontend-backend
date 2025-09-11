<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PurchasePaymentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
          [ 'supplier' => 'Aisha Doe', 'date' => '13/01/2025', 'ref' => '37364784', 'amount' => '306,678.00' ],
          [ 'supplier' => 'Chukwuemeka', 'date' => '13/01/2025', 'ref' => '465374846', 'amount' => '100,900.00' ],
          [ 'supplier' => 'Suleiman', 'date' => '13/01/2025', 'ref' => '45243637', 'amount' => '2,004,598.00' ],
        ];

        DB::table('purchase_payments')->truncate();
        DB::table('purchase_payments')->insert($data);
    }
}
