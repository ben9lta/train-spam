<?php

namespace App\Models;

use App\Enums\SpamTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'filename',
        'original_filename',
        'path',
        'spam_type',
        'user_id',
    ];

    protected $casts = [
        'spam_type' => SpamTypeEnum::class,
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
