<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
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
      'name' => 'Electronics', 
      'short_code' => 'ELEC001', 
      'description' => 'Electronic devices and gadgets including smartphones, laptops, and accessories',
    ],
    [ 
      'id' => 2, 
      'name' => 'Clothing & Apparel', 
      'short_code' => 'CLTH002', 
      'description' => 'Fashion items including men\'s, women\'s, and children\'s clothing'
    ],
    [ 
      'id' => 3, 
      'name' => 'Home & Garden', 
      'short_code' => 'HOME003', 
      'description' => 'Home improvement items, furniture, and garden supplies'
    ],
    [ 
      'id' => 4, 
      'name' => 'Sports & Outdoor', 
      'short_code' => 'SPRT004', 
      'description' => 'Sports equipment, outdoor gear, and fitness accessories'
    ],
    [ 
      'id' => 5, 
      'name' => 'Books & Media', 
      'short_code' => 'BOOK005', 
      'description' => 'Books, magazines, DVDs, and digital media content'
    ],
    [ 
      'id' => 6, 
      'name' => 'Health & Beauty', 
      'short_code' => 'HLTH006', 
      'description' => 'Personal care products, cosmetics, and health supplements'
    ],
    [ 
      'id' => 7, 
      'name' => 'Automotive', 
      'short_code' => 'AUTO007', 
      'description' => 'Car parts, accessories, and automotive maintenance products'
    ],
    [ 
      'id' => 8, 
      'name' => 'Toys & Games', 
      'short_code' => 'TOYS008', 
      'description' => 'Children\'s toys, board games, and educational materials'
    ],
    [ 
      'id' => 9, 
      'name' => 'Food & Beverages', 
      'short_code' => 'FOOD009', 
      'description' => 'Grocery items, snacks, beverages, and specialty food products'
    ],
    [ 
      'id' => 10, 
      'name' => 'Office Supplies', 
      'short_code' => 'OFFC010', 
      'description' => 'Stationery, office equipment, and business supplies'
    ],
  ];
      DB::table('categories')->truncate();
      DB::table('categories')->insert($data);
    }
}
