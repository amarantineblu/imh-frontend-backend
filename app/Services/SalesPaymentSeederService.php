<?php

namespace App\Services;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SalesPaymentSeederService extends Seeder
{
    public function run()
    {
        if (!Schema::hasTable('sales_payments')) {
            Log::info('Table sales_payments does not exist. Skipping.');
            return;
        }

        if (!Schema::hasTable('transaction_payments') || !Schema::hasTable('transactions')) {
            Log::info('Source tables transaction_payments or transactions missing. Skipping sales_payments seed.');
            return;
        }

        $count = DB::table('sales_payments')->count();
        if ($count > 0) {
            Log::info('sales_payments already has data. Skipping.');
            return;
        }

        // Join to contacts to get customer name if possible
        $hasContacts = Schema::hasTable('contacts');

        $query = DB::table('transaction_payments')
            ->join('transactions', 'transaction_payments.transaction_id', '=', 'transactions.id')
            ->where(function ($q) {
                $q->where('transactions.type', 'sell')
                  ->orWhere('transactions.type', 'sales')
                  ->orWhereNull('transactions.type');
            })
            ->select(
                DB::raw($hasContacts ? 'COALESCE(contacts.name, transactions.invoice_no, transactions.invoice) as customer' : 'COALESCE(transactions.invoice_no, transactions.invoice, \'Unknown\') as customer'),
                DB::raw('COALESCE(transaction_payments.payment_date, transaction_payments.created_at, transactions.transaction_date, transactions.created_at) as date'),
                DB::raw("COALESCE(transactions.invoice_no, transactions.invoice, CONCAT('INV-', transactions.id)) as invoice"),
                'transaction_payments.amount as amount'
            );

        if ($hasContacts) {
            $query->leftJoin('contacts', 'transactions.contact_id', '=', 'contacts.id');
        }

        $rows = $query->get();

        $inserted = 0;
        foreach ($rows as $r) {
            try {
                DB::table('sales_payments')->insert([
                    'customer' => $r->customer,
                    'date' => $r->date ?? now(),
                    'invoice' => $r->invoice,
                    'amount' => $r->amount,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                $inserted++;
            } catch (\Exception $e) {
                Log::error('sales_payments insert failed: ' . $e->getMessage());
            }
        }

        // Log::info("SalesPaymentsSeeder: inserted {$inserted} rows into sales_payments.");
    }
}