<?php

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
        Schema::create('transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('business_id')->unsigned();
            $table->foreign('business_id')->references('id')->on('business')->onDelete('cascade');
            $table->enum('type', ['purchase', 'sell']);
            $table->enum('status', ['received', 'pending', 'ordered', 'draft', 'final']);
            $table->enum('payment_status', ['paid', 'due']);
            $table->integer('contact_id')->unsigned();
            $table->foreign('contact_id')->references('id')->on('contacts')->onDelete('cascade');
            $table->string('invoice_no')->nullable();
            $table->string('ref_no')->nullable();
            $table->dateTime('transaction_date');
            $table->decimal('total_before_tax', 22, 4)->default(0)->comment('Total before the purchase/invoice tax, this includeds the indivisual product tax');
            $table->integer('tax_id')->unsigned()->nullable();
            $table->foreign('tax_id')->references('id')->on('tax_rates')->onDelete('cascade');
            $table->decimal('tax_amount', 22, 4)->default(0);
            $table->enum('discount_type', ['fixed', 'percentage'])->nullable();
            $table->decimal('discount_amount', 22, 4)->default(0);
            $table->string('shipping_details')->nullable();
            $table->decimal('shipping_charges', 22, 4)->default(0);
            $table->text('additional_notes')->nullable();
            $table->text('staff_note')->nullable();
            $table->decimal('final_total', 22, 4)->default(0);
            $table->string('invoice')->nullable();
            $table->integer('created_by')->unsigned();
            // $table->string('contact_name')->nullable();
            // $table->string('supplier_name')->nullable();
            // $table->string('customer_name')->nullable();
            // $table->string('location_name')->nullable();
            // $table->string('tax_name')->nullable();
            // $table->string('created_by_name')->nullable();
            // $table->boolean('is_quotation')->default(0);
            // $table->boolean('is_direct_sale')->default(0);
            // $table->boolean('is_suspend')->default(0);
            // $table->dateTime('suspend_date')->nullable();
            // $table->integer('suspend_count')->nullable();
            // $table->text('suspend_note')->nullable();
            // $table->integer('repair_completed_by')->unsigned()->nullable();
            // $table->foreign('repair_completed_by')->references('id')->on('users')->onDelete('cascade');
            // $table->dateTime('repair_completed_on')->nullable();
            // $table->boolean('is_repair')->default(0);
            // $table->boolean('is_completed')->default(0);
            // $table->text('repair_comment')->nullable();
            // $table->integer('return_parent_id')->unsigned()->nullable()->comment('Points to the original transaction in case of a return');
            // $table->integer('return_child_id')->unsigned()->nullable()->comment('Points to the return transaction in case of a sale/purchase return');
            // // $table->decimal('exchange_rate', 22, 4)->default(1);
            // $table->integer('import_batch')->unsigned()->nullable();
            // $table->boolean('is_recurring')->default(0);
            // $table->string('recur_interval')->nullable();
            // $table->integer('recur_interval_type')->unsigned()->nullable();
            // $table->integer('recur_repetitions')->unsigned()->nullable();
            // $table->dateTime('recur_stopped_on')->nullable();
            // $table->dateTime('last_recur_date')->nullable();
            // $table->dateTime('next_recur_date')->nullable();
            // $table->boolean('recur_parent_id')->nullable();
            // $table->text('recurring_invoice_payment')->nullable();
            // $table->text('recurring_invoice_payment_status')->nullable();
            // $table->text('recurring_invoice_payment_method')->nullable();
            // $table->text('recurring_invoice_payment_ref_no')->nullable();
            // $table->text('recurring_invoice_payment_transaction_id')->nullable();
            // $table->string('supplier_invoice_no')->nullable();
            $table->string('supplier')->nullable();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();

            //Indexing
            $table->index('business_id');
            $table->index('type');
            $table->index('contact_id');
            $table->index('transaction_date');
            $table->index('created_by');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};
