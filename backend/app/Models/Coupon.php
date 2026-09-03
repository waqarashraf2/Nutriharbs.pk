<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'discount_percentage' => 'integer',
        'fixed_discount' => 'float',
        'min_order' => 'float',
        'expires_at' => 'datetime',
    ];
}
