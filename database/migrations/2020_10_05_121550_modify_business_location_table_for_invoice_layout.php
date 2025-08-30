<?php

use App\BusinessLocation as AppBusinessLocation;
use App\Models\BusinessLocation;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::table('business_locations', function (Blueprint $table) {
        //     $table->integer('sale_invoice_layout_id')->nullable()->after('invoice_layout_id');
        // });

        // AppBusinessLocation::whereNotNull('id')->update([
        //     'sale_invoice_layout_id' => DB::raw('invoice_layout_id'),
        // ]);
        // ✅ Add column only if it does not exist
        if (!Schema::hasColumn('business_locations', 'sale_invoice_layout_id')) {
            Schema::table('business_locations', function (Blueprint $table) {
                $table->integer('sale_invoice_layout_id')->nullable()->after('invoice_layout_id');
            });
        }

        // ✅ Only update if column exists (to avoid issues in partial runs)
        if (Schema::hasColumn('business_locations', 'sale_invoice_layout_id')) {
            AppBusinessLocation::whereNotNull('id')->update([
                'sale_invoice_layout_id' => DB::raw('invoice_layout_id'),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
