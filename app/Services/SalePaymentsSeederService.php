<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
// use Illuminate\Support\Facades\Log;

class SalePaymentsSeederService
{
    public function run()
    {
        if (!Schema::hasTable('sale_payments')) {
            Log::info('Table sale_payments does not exist. Skipping.');
            return;
        }

        if (!Schema::hasTable('transaction_payments') || !Schema::hasTable('transactions')) {
            Log::info('Source tables transaction_payments or transactions missing. Skipping sale_payments seed.');
            return;
        }

        $count = DB::table('sale_payments')->count();
        if ($count > 0) {
            Log::info('sale_payments already has data. Skipping.');
            return;
        }

        $rows = DB::table('transaction_payments')
            ->join('transactions', 'transaction_payments.transaction_id', '=', 'transactions.id')
            ->where(function ($q) {
                $q->where('transactions.type', 'sell')
                  ->orWhere('transactions.type', 'sales')
                  ->orWhereNull('transactions.type');
            })
            ->select(
                'transactions.id as sale_id',
                'transaction_payments.amount as amount',
                DB::raw('COALESCE(transaction_payments.payment_date, transaction_payments.created_at, transactions.transaction_date, transactions.created_at) as payment_date')
            )
            ->get();

        $inserted = 0;
        foreach ($rows as $r) {
            try {
                DB::table('sale_payments')->insert([
                    'sale_id' => $r->sale_id,
                    'amount' => $r->amount,
                    'payment_date' => $r->payment_date ?? now(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                $inserted++;
            } catch (\Exception $e) {
                Log::error('Failed to insert sale_payment for sale_id ' . $r->sale_id . ': ' . $e->getMessage());
            }
        }

        // Log::info("SalePaymentsSeeder: inserted {$inserted} rows into sale_payments.");
    }
}
