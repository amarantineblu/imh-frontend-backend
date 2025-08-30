<?php

use App\Models\TransactionPayment;
use App\TransactionPayment as AppTransactionPayment;
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
       if (!Schema::hasColumn('transaction_payments', 'business_id')) {
        Schema::table('transaction_payments', function (Blueprint $table) {
            $table->integer('business_id')->after('transaction_id')->nullable();
        });
    }

    // ✅ Step 2: Populate data if the relationship exists
    $transaction_payments = AppTransactionPayment::with('created_user')->get();

    foreach ($transaction_payments as $transaction_payment) {
        $transaction_payment->business_id = $transaction_payment->created_user?->business_id;
        $transaction_payment->save();
    }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('transaction_payments', function (Blueprint $table) {
            //
        });
    }
};
