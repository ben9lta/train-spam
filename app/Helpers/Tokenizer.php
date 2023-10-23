<?php

namespace App\Helpers;

class Tokenizer {
    public static function tokenize(string $text) : array {
        $text = preg_replace('/[^\p{L}\p{N}\s]/u', ' ', $text);
        $words = preg_split('/\s+/', $text, -1, PREG_SPLIT_NO_EMPTY);
        return $words;
    }
}
