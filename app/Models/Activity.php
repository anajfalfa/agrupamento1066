<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'date',
        'location',
        'section_id',
        'image_url',
        'gallery_images',
        'created_by'
    ];

    protected $casts = [
        'date' => 'date',
        'gallery_images' => 'array',
    ];

    /**
     * Get the section that owns the activity.
     */
    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }

    /**
     * Get the gallery images for this activity.
     */
    public function gallery()
    {
        return $this->hasMany(Gallery::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
