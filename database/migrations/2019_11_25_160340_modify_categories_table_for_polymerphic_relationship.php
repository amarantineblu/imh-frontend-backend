<?php

use App\Category as AppCategory;
use App\Models\Category;
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
        // Schema::table('categories', function (Blueprint $table) {
        //     $table->string('category_type')->nullable()->after('created_by');
        //     $table->text('description')->nullable()->after('category_type');
        //     $table->string('slug')->nullable()->after('description');
        // });

        // Schema::create('categorizables', function (Blueprint $table) {
        //     $table->integer('category_id');
        //     $table->morphs('categorizable');
        // });

        // AppCategory::whereNotNull('id')->update(['category_type' => 'product']);
        // ✅ Add columns only if they don't exist
        Schema::table('categories', function (Blueprint $table) {
            if (!Schema::hasColumn('categories', 'category_type')) {
                $table->string('category_type')->nullable()->after('created_by');
            }
            if (!Schema::hasColumn('categories', 'description')) {
                $table->text('description')->nullable()->after('category_type');
            }
            if (!Schema::hasColumn('categories', 'slug')) {
                $table->string('slug')->nullable()->after('description');
            }
        });

        // ✅ Create 'categorizables' table only if it doesn't exist
        if (!Schema::hasTable('categorizables')) {
            Schema::create('categorizables', function (Blueprint $table) {
                $table->integer('category_id');
                $table->morphs('categorizable'); // Adds 'categorizable_id' and 'categorizable_type'
            });
        }

        // ✅ Use Eloquent to update category_type if column exists
        if (Schema::hasColumn('categories', 'category_type')) {
            AppCategory::whereNotNull('id')->update(['category_type' => 'product']);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       // Drop 'categorizables' table if it exists
        if (Schema::hasTable('categorizables')) {
            Schema::dropIfExists('categorizables');
        }

        // Drop columns safely
        Schema::table('categories', function (Blueprint $table) {
            if (Schema::hasColumn('categories', 'slug')) {
                $table->dropColumn('slug');
            }
            if (Schema::hasColumn('categories', 'description')) {
                $table->dropColumn('description');
            }
            if (Schema::hasColumn('categories', 'category_type')) {
                $table->dropColumn('category_type');
            }
        });
    }
};
