<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CampMetric extends Model
{
    protected $fillable = [
        'scout_id',
        'nights_count',
        'date_logged',
        'validated_by',
        'notes'
    ];

    protected $casts = [
        'date_logged' => 'date'
    ];

    public function scout()
    {
        return $this->belongsTo(Scout::class);
    }

    public function validator()
    {
        return $this->belongsTo(User::class, 'validated_by');
    }
}
