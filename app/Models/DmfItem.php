<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DmfItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'size',
        'condition',
        'quantity',
        'location',
        'for_donation',
        'price',
        'notes',
        'image_url',
        'created_by',
    ];

    protected $casts = [
        'for_donation' => 'boolean',
        'price' => 'decimal:2',
        'quantity' => 'integer',
    ];
}
