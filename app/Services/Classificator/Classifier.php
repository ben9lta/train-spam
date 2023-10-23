<?php

namespace App\Services\Classificator;

use App\Enums\SpamTypeEnum;

class Classifier {
    use Model;

    public array $documents = [];

    public function resetTrainingModel(): static
    {
        $this->documents = [];
        $this->resetModel();

        return $this;
    }

    protected function addDocuments(array $messages, array $types): static
    {
        $document = new Document();

        foreach ($messages as $index => $message) {
            $document = clone($document);
            $document->setMessage($message);
            $document->setType($types[$index]);

            $this->documents[] = $document;
        }

        return $this;
    }

    public function train(array $messages, array $types): static
    {
        $this->addDocuments($messages, $types);
        $this->training();

        return $this;
    }

    private function training(): static
    {
        $wordCount = [];
        $typeWordCount = [
            SpamTypeEnum::HAM->value   => [],
            SpamTypeEnum::SPAM->value  => [],
            SpamTypeEnum::AD->value    => [],
            SpamTypeEnum::OTHER->value => [],
        ];
        $typeCount = [
            SpamTypeEnum::HAM->value   => 0,
            SpamTypeEnum::SPAM->value  => 0,
            SpamTypeEnum::AD->value    => 0,
            SpamTypeEnum::OTHER->value => 0,
        ];
        $messageCount = 0;


        /** @var Document $document */
        foreach ($this->documents as $document)
        {
            $normalizedMessage = $document->getNormalizedMessage();
            $type = $document->getType();

            $messageCount++;
            $typeCount[$type]++;

            // создаем переменную для ускорения доступа к массиву
            $typeWordCountByType = &$typeWordCount[$type];

            foreach ($normalizedMessage as $word)
            {
                $wordCount[$word] = $wordCount[$word] ?? [
                    SpamTypeEnum::HAM->value   => 0,
                    SpamTypeEnum::SPAM->value  => 0,
                    SpamTypeEnum::AD->value    => 0,
                    SpamTypeEnum::OTHER->value => 0
                ];
                $wordCountByWord = &$wordCount[$word];

                if (array_key_exists($word, $typeWordCountByType)) {
                    $typeWordCountByType[$word]++;
                } else {
                    $typeWordCountByType[$word] = 1;
                }

                $wordCountByWord[$type]++;
                $typeWordCountByType[$word]++;

            }
        }

        $this->setModel($messageCount, $typeCount, $typeWordCount, $wordCount);
        return $this;
    }

    // Предсказание класса для нового сообщения
    public function predict(string $text): int
    {
        $hamProb   = $this->classify($text, SpamTypeEnum::HAM->value);
        $spamProb  = $this->classify($text, SpamTypeEnum::SPAM->value);
        $adProb    = $this->classify($text, SpamTypeEnum::AD->value);
        $otherProb = $this->classify($text, SpamTypeEnum::OTHER->value);

        $prob1 = max($spamProb, $hamProb);
        $prob2 = max($adProb, $otherProb);

        $prob1Type = $spamProb > $hamProb ? SpamTypeEnum::SPAM->value : SpamTypeEnum::HAM->value;
        $prob2Type = $adProb > $otherProb ? SpamTypeEnum::AD->value : SpamTypeEnum::OTHER->value;

        $probType = $prob1 > $prob2 ? $prob1Type : $prob2Type;

        return $probType;
    }

    // Расчет вероятности класса
    private function classify(string $text, int $type) : float
    {
        $document = new Document();
        $document->setMessage($text);

        $normalizedMessage = $document->getNormalizedMessage();

        // это вероятность того, что сообщение относится к заданному классу (например, спаму или не спаму).
        // вероятность вычисляется как отношение количества сообщений, которые относятся к этому классу,
        // к общему количеству сообщений в обучающей выборке.
        $typeProbability = $this->getTypeCount($type) / $this->getMessageCount();

        if ($typeProbability === 0) {
            $typeProbability = 0.01;
        }

        // логарифм вероятности, что сообщение относится к заданному классу.
        // он начально инициализируется логарифмом вероятности класса $typeProbability
        $probability = log($typeProbability);


        // вычисление вероятности того, что сообщение принадлежит к определенному классу на основе токенов в сообщении
        foreach ($normalizedMessage as $word)
        {
            if ($this->getWordCount($word) === null)
            {
                continue;
            }

            $wordProbability = ($this->getWordCount($word)[$type] + 1) / ($this->getTypeCount($type) + $this->getWordsCount());
            $probability += log($wordProbability);
        }

        return $probability;
    }
}
