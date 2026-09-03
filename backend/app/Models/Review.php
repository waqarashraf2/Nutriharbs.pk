<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'rating' => 'integer',
        'verified' => 'boolean',
        'helpful_count' => 'integer',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
