<?php

use App\Models\Transaction;
use App\Transaction as AppTransaction;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('ALTER TABLE transactions MODIFY COLUMN `status` VARCHAR(191) NOT NULL;');

        AppTransaction::where('type', 'sell_transfer')
                ->update(['status' => 'final']);

        AppTransaction::where('type', 'purchase_transfer')
                ->update(['status' => 'received']);
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
