<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PendingShipmentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
        [ 'customer' => 'Suleiman', 'date' => '13/01/2025', 'invoice' => '45243637', 'contact' => '45535566...', 'location' => '-', 'shippingStatus' => '-', 'paymentStatus' => '-' ],
        [ 'customer' => 'Aisha Doe', 'date' => '13/01/2025', 'invoice' => '37364784', 'contact' => '306,678.00', 'location' => '-', 'shippingStatus' => '-', 'paymentStatus' => '-' ],
        [ 'customer' => 'Chukwuemeka', 'date' => '13/01/2025', 'invoice' => '465374846', 'contact' => '100,900.00', 'location' => '-', 'shippingStatus' => '-', 'paymentStatus' => '-' ],
      ];
      DB::table('pending_shipments')->truncate();
          DB::table('pending_shipments')->insert($data);
    }
}
