<?php

namespace App\Services\Classificator;

trait Model {
    public int $messageCount;
    public array $typeCount;
    public array $typeWordCount;
    public array $wordCount;

    public function setModel($messageCount = 0, $typeCount = [], $typeWordCount = [], $wordCount = []): static
    {
        $this->messageCount = $messageCount;
        $this->typeCount = $typeCount;
        $this->typeWordCount = $typeWordCount;
        $this->wordCount = $wordCount;

        return $this;
    }

    public function resetModel(): static
    {
        $this->messageCount = 0;
        $this->typeCount = [];
        $this->typeWordCount = [];
        $this->wordCount = [];

        return $this;
    }

    public function getTypeCount(int $type)
    {
        if (!array_key_exists($type, $this->typeCount)) {
            return null;
        }

        return $this->typeCount[$type];
    }

    public function getWords()
    {
        return $this->wordCount;
    }

    public function getWordsCount(): int
    {
        return count($this->wordCount);
    }

    public function getWordCount(string $word)
    {
        if (!array_key_exists($word, $this->wordCount)) {
            return null;
        }

        return $this->wordCount[$word];
    }

    public function getMessageCount(): int
    {
        return $this->messageCount;
    }
}
