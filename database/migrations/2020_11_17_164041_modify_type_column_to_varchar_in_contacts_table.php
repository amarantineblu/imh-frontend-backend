<?php

use App\Contact as AppContact;
use App\Models\Contact;
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
        DB::statement('ALTER TABLE contacts MODIFY COLUMN `type` VARCHAR(191) NOT NULL');

        AppContact::where('type', '=', '')
                 ->orWhereNull('type')
                ->update(['type' => 'lead']);
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
