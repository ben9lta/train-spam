<?php

namespace App\Services\Classificator;

use App\Enums\SpamTypeEnum;
use App\Helpers\Tokenizer;

class Document {
    private ?string $message;
    private ?int $type;
    private Tokenizer $tokenizer;

    public function __construct(?string $message = null, ?int $type = null)
    {
        $this->message = $message;
        $this->type = $type;
        $this->tokenizer = new Tokenizer();
    }

    public function __clone(): void
    {
        $this->clear();
    }

    public function setMessage(string $message): Document
    {
        $this->message = $message;
        return $this;
    }

    public function setType(int $type): Document
    {
        $this->type = $type;
        return $this;
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    public function getType(): ?int
    {
        return $this->type;
    }

    public function clear(): Document
    {
        $this->type = null;
        $this->message = null;

        return $this;
    }

    // убираем стоп-слова, то есть наиболее распространенные слова в языке, которые не несут никакой информации
    // о содержании текста (например, артикли, предлоги и т.д.)
    public function getNormalizedMessage(): array
    {
        return $this->tokenizer->tokenize($this->message);
    }

}
