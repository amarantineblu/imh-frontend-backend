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
      Schema::create('pos_transactions', function (Blueprint $table) {
        $table->id();
        $table->string('date');
        $table->string('tallyNo');
        $table->string('customerName');
        $table->string('contactNumber');
        $table->string('location');
        $table->string('paymentStatus');
        $table->string('paymentMethod');
        $table->string('totalAmount');
        $table->string('totalPaid');
        $table->string('sellDue');
        $table->string('sellReturnDue');
        $table->string('shippingStatus');
        $table->string('totalItems');
        $table->string('addedBy');
        $table->string('sellNote');
        $table->string('staffNote');
        $table->string('shippingDetails');
        $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      Schema::dropIfExists('pos_transactions');
    }
};
