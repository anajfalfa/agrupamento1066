<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Leader extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'role',
        'section_id',
        'photo',
        'bio',
        'email',
        'phone',
        'order',
    ];

    /**
     * Get the section that owns the leader.
     */
    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }
}
