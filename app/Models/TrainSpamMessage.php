<?php

namespace App\Models;

use App\Enums\SpamTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id ID записи;
 * @property string $text Текст;
 * @property string $hashed_text Хешированный текст;
 * @property SpamTypeEnum $spam_type Тип спам сообщения;
 * @property int $user_id ID пользователя;
 * @property User $user Модель пользователя;
 */
class TrainSpamMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
        'hashed_text',
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
