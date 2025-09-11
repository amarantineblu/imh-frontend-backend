<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VariationsTableSeeder extends Seeder
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
      'product' => 'T-Shirt',
      'template' => 'Size & Color',
      'combinations' => 12,
      'status' => 'Active',
      'atributes' => ['Size: S, M, L, XL', 'Color: Red, Blue, Green'],
    ],
    [
      'id' => 2,
      'product' => 'Smartphone',
      'template' => 'Storage & Color',
      'combinations' => 6,
      'status' => 'Active',
      'atributes' => ['Storage: 128GB, 256GB', 'Color: Black, White, Gold'],
    ],
    [
      'id' => 3,
      'product' => 'Laptop',
      'template' => 'RAM & Storage',
      'combinations' => 8,
      'status' => 'Draft',
      'atributes' => ['RAM: 8GB, 16GB', 'Storage: 256GB, 512GB, 1TB'],
    ],
  ];
      DB::table('variations')->truncate();
      DB::table('variations')->insert($data);
    }
}
