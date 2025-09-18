<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PurchasePaymentsSeeder extends Seeder
{
    public function run()
    {
        if (!Schema::hasTable('purchase_payments')) {
            $this->command->info('Table purchase_payments missing. Skipping.');
            return;
        }
        if (!Schema::hasTable('transaction_payments') || !Schema::hasTable('transactions')) {
            $this->command->info('Source tables missing. Skipping purchase_payments.');
            return;
        }
        if (DB::table('purchase_payments')->count() > 0) {
            $this->command->info('purchase_payments already populated. Skipping.');
            return;
        }

        $rows = DB::table('transaction_payments')
            ->join('transactions','transaction_payments.transaction_id','=','transactions.id')
            ->where('transactions.type','purchase')
            ->select(
                DB::raw('COALESCE(transactions.contact_name, transactions.supplier_name, transactions.supplier, "Supplier") as supplier'),
                DB::raw('COALESCE(transaction_payments.payment_date, transaction_payments.created_at) as date'),
                DB::raw('COALESCE(transactions.ref, transactions.invoice_no, CONCAT("PO-", transactions.id)) as ref'),
                'transaction_payments.amount as amount'
            )->get();

        foreach ($rows as $r) {
            DB::table('purchase_payments')->insert([
                'supplier' => $r->supplier,
                'date' => $r->date,
                'ref' => $r->ref,
                'amount' => $r->amount,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        $this->command->info('PurchasePaymentsSeeder: done.');
    }
}