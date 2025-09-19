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
            $table->decimal('stock', 22, 4)->default(0)->after('qty_available');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('variation_location_details', function (Blueprint $table) {
            //
                $table->dropColumn('stock');
        });
    }
};
