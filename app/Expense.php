<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    //
    protected $fillable = [
        'expense_category_id',
        'amount',
        'date',
        'reference',
        'note',
        'created_by',
        'business_id',
    ];
}
