<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgressionStep extends Model
{
    protected $fillable = [
        'scout_id',
        'step_name',
        'section_id',
        'completed_at',
        'validated_by'
    ];

    protected $casts = [
        'completed_at' => 'datetime'
    ];

    public function scout()
    {
        return $this->belongsTo(Scout::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function validator()
    {
        return $this->belongsTo(User::class, 'validated_by');
    }
}
