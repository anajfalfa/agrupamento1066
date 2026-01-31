<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'age_range',
        'color',
        'icon',
        'order',
    ];

    /**
     * Get the leaders for this section.
     */
    public function leaders(): HasMany
    {
        return $this->hasMany(Leader::class)->orderBy('order');
    }

    /**
     * Get the activities for this section.
     */
    public function activities(): HasMany
    {
        return $this->hasMany(Activity::class);
    }

    /**
     * Get the calendar events for this section.
     */
    public function calendarEvents(): HasMany
    {
        return $this->hasMany(CalendarEvent::class);
    }
}
