<?php

use App\Models\Transaction;
use App\Transaction as AppTransaction;
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
        // Schema::table('transactions', function (Blueprint $table) {
        //     $table->index('status');
        // });

        // AppTransaction::where('type', 'sell_transfer')
        //         ->where('status', 'completed')
        //         ->update(['status' => 'final']);

        // AppTransaction::where('type', 'purchase_transfer')
        //         ->where('status', 'completed')
        //         ->update(['status' => 'received']);
        // ✅ Check if the index exists before adding it
        $indexExists = collect(DB::select(
            "SHOW INDEX FROM transactions WHERE Key_name = 'transactions_status_index'"
        ))->isNotEmpty();

        if (!$indexExists) {
            Schema::table('transactions', function (Blueprint $table) {
                $table->index('status');
            });
        }

        // ✅ Update statuses safely
        AppTransaction::where('type', 'sell_transfer')
            ->where('status', 'completed')
            ->update(['status' => 'final']);

        AppTransaction::where('type', 'purchase_transfer')
            ->where('status', 'completed')
            ->update(['status' => 'received']);
    }
};
