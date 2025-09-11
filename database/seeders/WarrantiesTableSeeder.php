<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WarrantiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
    [ 
      'id' => 1, 
      'name' => '1 Year Standard', 
      'description' => 'Standard warranty coverage for electronics and appliances', 
      'duration' => '12 months',
      'duration_type' => null,
      'business_id' => 1,

    ],
    [ 
      'id' => 2, 
      'name' => '2 Year Extended', 
      'description' => 'Extended warranty for premium products and devices', 
      'duration' => '24 months',
      'duration_type' => null,
      'business_id' => 2,
    ],
    [ 
      'id' => 3, 
      'name' => '6 Month Basic', 
      'description' => 'Basic warranty for accessories and consumables', 
      'duration' => '6 months',
      'duration_type' => null,
      'business_id' => 3,
    ],
    [ 
      'id' => 4, 
      'name' => '3 Year Premium', 
      'description' => 'Premium warranty with comprehensive coverage', 
      'duration' => '36 months',
      'duration_type' => null,
      'business_id' => 4,
    ],
    [ 
      'id' => 5, 
      'name' => '90 Day Limited', 
      'description' => 'Limited warranty for trial and sample products', 
      'duration' => '3 months',
      'duration_type' => null,
      'business_id' => 5,
    ],
    [ 
      'id' => 6, 
      'name' => '5 Year Extended Plus', 
      'description' => 'Extended plus warranty for high-value items', 
      'duration' => '60 months',
      'duration_type' => null,
      'business_id' => 6,
    ],
    [ 
      'id' => 7, 
      'name' => 'Lifetime Warranty', 
      'description' => 'Lifetime warranty for select premium products', 
      'duration' => 'Lifetime',
      'duration_type' => null,
      'business_id' => 7,
    ],
    [ 
      'id' => 8, 
      'name' => '30 Day Return', 
      'description' => 'Return policy warranty for new customer purchases', 
      'duration' => '1 month',
      'duration_type' => null,
      'business_id' => 8,
    ],
    [ 
      'id' => 9, 
      'name' => 'International Warranty', 
      'description' => 'Global warranty coverage for international products', 
      'duration' => '18 months',
      'duration_type' => null,
      'business_id' => 9,
    ],
    [ 
      'id' => 10, 
      'name' => 'Professional Service', 
      'description' => 'Professional service warranty for business equipment', 
      'duration' => '24 months',
      'duration_type' => null,
      'business_id' => 10,
    ],
  ];
     DB::table('warranties')->truncate();
          DB::table('warranties')->insert($data);
    }
}
