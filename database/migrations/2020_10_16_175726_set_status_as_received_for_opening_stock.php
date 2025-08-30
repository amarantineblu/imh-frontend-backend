<?php

use App\Models\Transaction;
use App\Transaction as AppTransaction;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        AppTransaction::where('type', 'opening_stock')
                    ->where('status', '!=', 'received')
                    ->update(['status' => 'received']);
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
