<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryTimeline extends Model
{
    use HasFactory;

    protected $table = 'history_timeline';

    protected $fillable = [
        'year',
        'title',
        'description',
        'image_url',
        'is_milestone',
        'created_by'
    ];

    protected $casts = [
        'year' => 'integer',
        'order' => 'integer',
    ];
}
