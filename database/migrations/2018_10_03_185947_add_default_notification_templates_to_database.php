<?php

use App\Models\Business;
use App\Models\NotificationTemplate;
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
        $businesses = DB::table('business')->get();

        $notification_template_data = [];
        foreach ($businesses as $business) {
            $notification_templates = DB::table('notification_templates')->defaultNotificationTemplates($business->id);
            DB::table('notification_templates')->insert($notification_templates);
        }
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
