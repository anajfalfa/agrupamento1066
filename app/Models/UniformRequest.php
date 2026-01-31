<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UniformRequest extends Model
{
    protected $fillable = [
        'scout_id',
        'item_type',
        'details',
        'status',
        'processed_by'
    ];

    public function scout()
    {
        return $this->belongsTo(Scout::class);
    }

    public function processor()
    {
        return $this->belongsTo(User::class, 'processed_by');
    }
}
