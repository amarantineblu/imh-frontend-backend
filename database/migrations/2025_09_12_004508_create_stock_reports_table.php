<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stock_reports', function (Blueprint $table) {
            $table->id();
            $table->string('sku');
            $table->string('product');
            $table->string('variation');
            $table->string('category');
            $table->string('location');
            $table->string('unitSellingPrice');
            $table->string('currentStock');
            $table->integer('currentStockValuePurchase');
            $table->integer('currentStockValueSale');
            $table->integer('potentialProfit');
            $table->integer('totalUnitSold');
            $table->integer('totalUnitTransferred');
            $table->integer('totalUnitAdjusted');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_reports');
    }
};
