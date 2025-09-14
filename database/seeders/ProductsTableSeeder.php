<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
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
    'image' => '/placeholder-product.jpg',
    'name' => 'Wireless Bluetooth Headphones',
    'businessLocation' => 'Main Store',
    'unitPurchasePrice' => 75.00,
    'sellingPrice' => 99.99,
    'currentStock' => 50,
    'productType' => 'Simple',
    'category' => 'Electronics',
    'brand' => 'TechBrand',
    'tax' => 10,
    'sku' => 'WBH-001',
    'business_id' => null,
  ], 
  [
    'id' => 2,
    'image' => '/placeholder-product.jpg',
    'name' => 'Organic Coffee Beans 1kg',
    'businessLocation' => 'Branch Store',
    'unitPurchasePrice' => 18.00,
    'sellingPrice' => 24.99,
    'currentStock' => 120,
    'productType' => 'Simple',
    'category' => 'Food & Beverages',
    'brand' => 'CoffeeMaster',
    'tax' => 5,
    'sku' => 'OCB-1KG',
  ], 
  [
    'id' => 3,
    'image' => '/placeholder-product.jpg',
    'name' => 'Gaming Mouse RGB',
    'businessLocation' => 'Online Store',
    'unitPurchasePrice' => 55.00,
    'sellingPrice' => 79.99,
    'currentStock' => 0,
    'productType' => 'Variable',
    'category' => 'Electronics',
    'brand' => 'GameTech',
    'tax' => 10,
    'sku' => 'GM-RGB-001',
  ], 
];
    }
}
