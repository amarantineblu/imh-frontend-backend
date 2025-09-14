<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandsTableSeeder extends Seeder
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
     'name' => 'COW MEAT', 
     'description' => 'LAP',
     'created_by' => 1,
     'deleted_at' => null,
     'created_at' => null,
     'business_id' => 1
    ],
    [ 
     'id' => 2, 
     'name' => 'APPLE', 
     'description' => 'Premium electronics and devices brand',
     'created_by' => 1,
     'deleted_at' => null,
     'created_at' => null,
     'business_id' => 1
    ],
    [ 
     'id' => 3, 
     'name' => 'SAMSUNG', 
     'description' => 'South Korean technology conglomerate',
     'created_by' => 1,
     'deleted_at' => null,
     'created_at' => null,
     'business_id' => 1
    ],
    [ 
     'id' => 4, 
     'name' => 'NIKE', 
     'description' => 'American athletic footwear and apparel',
     'created_by' => 1,
     'deleted_at' => null,
     'created_at' => null,
     'business_id' => 1
    ],
    [ 
     'id' => 5, 
     'name' => 'ADIDAS', 
     'description' => 'German multinational sports corporation',
     'created_by' => 1,
     'deleted_at' => null,
     'created_at' => null,
     'business_id' => 1
    ],
    [ 
     'id' => 6, 
     'name' => 'SONY', 
     'description' => 'Japanese electronics and entertainment',
     'created_by' => 1,
     'deleted_at' => null,
     'created_at' => null,
     'business_id' => 1
    ],
    [ 
     'id' => 7, 
     'name' => 'COCA-COLA', 
     'description' => 'Global beverage company',
     'created_by' => 1,
     'deleted_at' => null,
     'created_at' => null,
     'business_id' => 1
    ],
    [ 
     'id' => 8, 
     'name' => 'TOYOTA', 
     'description' => 'Japanese automotive manufacturer',
     'created_by' => 1,
     'deleted_at' => null,
     'created_at' => null,
     'business_id' => 1
    ],
    [ 
     'id' => 9, 
     'name' => 'MICROSOFT', 
     'description' => 'American technology corporation',
     'created_by' => 1,
     'deleted_at' => null,
     'created_at' => null,
     'business_id' => 1
    ],
    [ 
     'id' => 10, 
     'name' => 'GOOGLE', 
     'description' => 'American search engine and technology',
     'created_by' => 1,
     'deleted_at' => null,
     'created_at' => null,
     'business_id' => 1
    ],
    [ 
     'id' => 11, 
     'name' => 'AMAZON', 
     'description' => 'American e-commerce and cloud computing',
     'created_by' => 1,
     'deleted_at' => null,
     'created_at' => null,
     'business_id' => 1
    ],
    [ 
     'id' => 12, 
     'name' => 'FACEBOOK', 
     'description' => 'Social media and technology company',
     'created_by' => 1,
     'deleted_at' => null,
     'created_at' => null,
     'business_id' => 1
    ],
  ];
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    DB::table('brands')->truncate();
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    DB::table('brands')->insert($data);
  }
}
