<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
      $data = [
        [ 'id' =>  1, 'name' =>  'KILOGRAM', 'short_name' =>  'KG', 'allow_decimal' =>  true ],
        [ 'id' =>  2, 'name' =>  'Pieces', 'short_name' =>  'Pc(s)', 'allow_decimal' =>  false ],
      ];
      DB::table('units')->truncate();
      DB::table('units')->insert($data);
    }
}
