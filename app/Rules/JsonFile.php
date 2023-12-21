<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;
use Illuminate\Translation\PotentiallyTranslatedString;

class JsonFile implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($value instanceof UploadedFile) {
            $contents = file_get_contents($value->getRealPath());
            $decoded = json_decode($contents);

            if ($decoded === null || json_last_error() !== JSON_ERROR_NONE) {
                $fail("$attribute должен иметь валидную структуру JSON.");
            }
        } else {
            $fail("$attribute должен быть файлом.");
        }
    }
}
