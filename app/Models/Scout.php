<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scout extends Model
{
    protected $fillable = [
        'name',
        'birth_date',
        'entry_year',
        'section_id',
        'is_active',
        'user_id'
    ];

    protected $casts = [
        'birth_date' => 'date',
        'is_active' => 'boolean'
    ];

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function progressionSteps()
    {
        return $this->hasMany(ProgressionStep::class);
    }

    public function campMetrics()
    {
        return $this->hasMany(CampMetric::class);
    }

    public function uniformRequests()
    {
        return $this->hasMany(UniformRequest::class);
    }
}
