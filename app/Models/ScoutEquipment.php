<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScoutEquipment extends Model
{
    use HasFactory;

    protected $table = 'scout_equipment';

    protected $fillable = [
        'name',
        'category',
        'quantity',
        'condition',
        'location',
        'last_inspection_date',
        'next_inspection_date',
        'purchase_date',
        'notes',
        'image_url', // Changed from 'image'
        'created_by', // Added this line
    ];

    protected $casts = [
        'quantity' => 'integer',
        'last_inspection_date' => 'date',
        'next_inspection_date' => 'date',
        'purchase_date' => 'date',
    ];

    /**
     * Get the user who created the equipment.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
