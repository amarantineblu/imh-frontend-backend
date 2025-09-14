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
        Schema::create('pending_shipments', function (Blueprint $table) {
            $table->id();
            $table->string('customer');
            $table->string('date');
            $table->string('invoice');
            $table->string('contact');
            $table->string('location');
            $table->string('shippingStatus');
            $table->string('paymentStatus');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pending_shipments');
    }
};
