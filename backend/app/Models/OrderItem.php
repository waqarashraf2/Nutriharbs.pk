<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'price' => 'float',
        'total' => 'float',
        'quantity' => 'integer',
        'pack_count' => 'integer',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
