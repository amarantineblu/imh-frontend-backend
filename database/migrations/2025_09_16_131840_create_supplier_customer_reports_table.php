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
        Schema::create('supplier_customer_reports', function (Blueprint $table) {
            $table->id();
            $table->string('contact');
            $table->decimal('total_purchase', 15, 2)->default(0);
            $table->decimal('total_purchase_return', 15, 2)->default(0);
            $table->decimal('total_sale', 15, 2)->default(0);
            $table->decimal('total_sell_return', 15, 2)->default(0);
            $table->decimal('opening_balance_due', 15, 2)->default(0);
            $table->decimal('due', 15, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supplier_customer_reports');
    }
};
