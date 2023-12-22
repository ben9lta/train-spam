<?php

namespace App\Helpers;

use App\Enums\SpamTypeEnum;

class SpamTypeHelper {
    public static function translate(int $type): string
    {
        return match ($type) {
            SpamTypeEnum::HAM->value    => 'Не спам',
            SpamTypeEnum::SPAM->value   => 'Спам',
            SpamTypeEnum::AD->value     => 'Рекламный',
            SpamTypeEnum::OTHER->value  => 'Другой',
            default                     => 'Не определено',
        };
    }

    public static function getKeys(): array
    {
        return array_column(SpamTypeEnum::cases(), 'name');
    }

    public static function getValues(): array
    {
        return array_column(SpamTypeEnum::cases(), 'value');
    }
}
