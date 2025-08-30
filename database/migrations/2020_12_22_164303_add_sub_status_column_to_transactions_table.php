<?php

use App\Models\Transaction;
use App\Transaction as AppTransaction;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        // Schema::table('transactions', function (Blueprint $table) {
        //     $table->string('sub_status')->after('status')->nullable()->index();
        // });

        // AppTransaction::where('is_quotation', 1)->update(['sub_status' => 'quotation']);
        // ✅ Add the column with index only if it doesn't already exist
        if (!Schema::hasColumn('transactions', 'sub_status')) {
            Schema::table('transactions', function (Blueprint $table) {
                $table->string('sub_status')->after('status')->nullable()->index();
            });
        }

        // ✅ Update existing rows if the column exists
        if (Schema::hasColumn('transactions', 'sub_status')) {
            AppTransaction::where('is_quotation', 1)->update(['sub_status' => 'quotation']);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
};
