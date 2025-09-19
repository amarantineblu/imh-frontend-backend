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
        Schema::table('transactions', function (Blueprint $table) {
            //
            $table->string('supplier_name')->nullable()->after('contact_name');
            $table->string('customer_name')->nullable()->after('supplier_name');
            $table->string('ref')->nullable()->after('business_id');
            // $table->string('invoice_no')->nullable()->after('business_id');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            //
                $table->dropColumn('supplier_name');
                $table->dropColumn('customer_name');
                $table->dropColumn('ref');
                // $table->dropColumn('invoice_no');
        });
    }
};
