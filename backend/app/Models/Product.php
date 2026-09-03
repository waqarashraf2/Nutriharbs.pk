<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'badges' => 'array',
        'key_benefits' => 'array',
        'supplement_facts' => 'array',
        'in_stock' => 'boolean',
        'is_best_seller' => 'boolean',
        'is_trending' => 'boolean',
        'price' => 'float',
        'original_price' => 'float',
        'rating' => 'float',
    ];

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
