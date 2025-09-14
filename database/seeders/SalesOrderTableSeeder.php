<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SalesOrderTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
        [ 'customer' => 'Suleiman',  'date' => '13/01/2025',  'order' => '45243637',  'contact' => '45535566...',  'location' => '-',  'status' => '-',  'shippingStatus' => '-',  'qtyRemaining' =>'-',  'addedBy' =>'- ' ],
        [ 'customer' => 'Aisha Doe',  'date' => '13/01/2025',  'order' => '37364784',  'contact' => '306,678.00',  'location' => '-',  'status' => '-',  'shippingStatus' => '-',  'qtyRemaining' =>'-',  'addedBy' =>'- ' ],
        [ 'customer' => 'Chukwuemeka',  'date' => '13/01/2025',  'order' => '465374846',  'contact' => '100,900.00',  'location' => '-',  'status' => '-',  'shippingStatus' => '-',  'qtyRemaining' =>'-',  'addedBy' =>'- ' ],
        ];
        DB::table('sales_orders')->truncate();
          DB::table('sales_orders')->insert($data);
    }
}
