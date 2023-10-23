<?php

namespace App\Services;

use App\Enums\SpamTypeEnum;
use App\Events\TrainModelUpdater;
use App\Models\TrainSpamMessage;
use App\Repository\TrainSpamRepository\TrainSpamRepository;
use App\Repository\TrainSpamRepository\TrainSpamRepositoryInterface;
use App\Services\Classificator\Classifier;
use App\Traits\TrainSpamTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MessageClassifier
{
    use TrainSpamTrait {
        TrainSpamTrait::__construct as private __trainSpamConstruct;
    }
    private Classifier $classifier;

    public function __construct()
    {
        $this->classifier = new Classifier();
        $this->baseTraining();
        $this->__trainSpamConstruct();
    }

    // Обучение классификатора на массиве текстов и соответствующих метках (0, 1, 2, 3 и т. д.).
    public function train(array $texts, array $labels): void
    {
        $this->classifier->train($texts, $labels);
    }

    public function getTrainModel(int $userId)
    {
        return $this->getTrainSpamRepository($userId)->getUserTrainModel();
    }

    public function trainFromDB(int $userId): static
    {
        $model = $this->getTrainModel($userId);

        $texts = [];
        $labels = [];
        foreach ($model as $item) {
            $text = $item->text;
            $type = $item->spam_type;
            $texts[] = $text;
            $labels[] = $type;
        }

        $this->classifier->train($texts, $labels);

        unset($model);
        return $this;
    }

    // Обучение классификатора из Json файла текстов и соответствующем типе метки (0, 1, 2, 3 и т. д.).
    public function trainFromJsonFile(string $jsonFilePath, SpamTypeEnum $type, int $userId = 0): void
    {
        $spamType = $type->value;
        $messages = $this->getDataFromFile($jsonFilePath);
        $insert = $this->collectTrainSpamMessages($messages, $spamType, $userId);
        $this->insertUniqueData($insert);

        unset($messages);
    }

    public function trainCommonFile(string $jsonFilePath, int $userId = 0): void
    {
        $labels = [];
        $messages = [];

        $data = $this->getDataFromFile($jsonFilePath);
        foreach ($data as $index => $value) {
            if ($index & 1) {
                $labels[] = $value;
            } else {
                $messages[] = $value;
            }
        }

        $insert = $this->collectTrainSpamMessages($messages, $labels, $userId);
        $this->insertUniqueData($insert);

        unset($messages);
        unset($labels);
        unset($data);
    }

    public function isCommonType(SpamTypeEnum $type): bool
    {
        return $type->value === -1;
    }

    public function trainByFileType(string $jsonFilePath, SpamTypeEnum $spamType, int $userId): void
    {
        $isCommonFileType = $this->isCommonType($spamType);
        if ($isCommonFileType) {
            $this->trainCommonFile($jsonFilePath, $userId);
        }

        if (!$isCommonFileType) {
            $this->trainFromJsonFile($jsonFilePath, $spamType, $userId);
        }

//        FileService::removeByFilePath($jsonFilePath, $userId);
    }

    private function insertUniqueData(array $insertArray): bool
    {
        $userId = $insertArray[0]['user_id'];
        $model = $this->getTrainModel($userId);
        $texts = array_column($model, 'hashed_text');

        foreach ($insertArray as $index => $row) {
            $hashedText = $row['hashed_text'];
            if (in_array($hashedText, $texts)) {
                unset($insertArray[$index]);
            }
        }

        $insertOk = DB::transaction(function() use ($insertArray) {
            return TrainSpamMessage::query()->insert($insertArray);
        }, 3);

        if ($insertOk) {
            TrainModelUpdater::dispatch($userId);
            unset($insertArray);
        }

        return $insertOk;
    }

    private function collectTrainSpamMessages(array $messages, int|array $spamType, int $userId = 0): array
    {
        $insert = [];
        $label = null;

        foreach ($messages as $index => $message) {
            if (gettype($spamType) === 'integer') {
                $label = $spamType;
            }

            if (gettype($spamType) === 'array') {
                $label = $spamType[$index];
            }

            $insert[] = [
                'text' => $message,
                'hashed_text' => md5($message),
                'user_id' => $userId,
                'spam_type' => $label,
            ];
        }

        return $insert;
    }

    private function getDataFromFile(string $jsonFilePath): array
    {
        $file = Storage::get($jsonFilePath);
        $data = json_decode($file);
        return $data->array;
    }


    // Классификация текста и возвращение числовой метки.
    public function classify(string $text): int
    {
        return $this->classifier->predict($text);
    }

    private function baseTraining()
    {
//        $this->trainFromJsonFile();
    }
}
