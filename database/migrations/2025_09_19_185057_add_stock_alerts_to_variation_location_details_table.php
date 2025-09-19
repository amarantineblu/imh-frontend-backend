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
        Schema::table('variation_location_details', function (Blueprint $table) {
            //
            $table->integer('stock_alert')->default(0)->after('stock');
            // $table->integer('qty_available')->nullable()->default(0)->after('stock_alert');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('variation_location_details', function (Blueprint $table) {
            //
                $table->dropColumn('stock_alert');
                // $table->dropColumn('qty_available');
        });
    }
};
