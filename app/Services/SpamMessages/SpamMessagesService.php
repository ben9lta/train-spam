<?php

namespace App\Services\SpamMessages;

use App\Enums\SpamTypeEnum;
use App\Helpers\SpamTypeHelper;
use App\Http\Requests\TrainSpamMessage\CheckTrainSpamMessageRequest;
use App\Http\Requests\TrainSpamMessage\UpdateAndTrainingTrainSpamMessageRequest;
use App\Http\Requests\TrainSpamMessage\UpdateTrainSpamMessageRequest;
use App\Models\TrainSpamMessage;
use App\Services\FileService;
use App\Services\MessageClassifier;
use App\Traits\TrainSpamTrait;
use Illuminate\Http\Request;

class SpamMessagesService
{
    use TrainSpamTrait {
        TrainSpamTrait::__construct as __trainSpamConstruct;
    }

    public MessageClassifier $classifier;

    public function __construct()
    {
        $this->classifier = app(MessageClassifier::class);
        $this->__trainSpamConstruct();
    }

    public function paginateUserMessages(Request $request, int $page = 1)
    {
        return $this->getTrainSpamRepository($request)
            ->getUserPaginateTrainModel($page);
    }

    public function update(UpdateTrainSpamMessageRequest $request, TrainSpamMessage $spamMessage): bool
    {
        $requestData = $request->validated();
        $spamMessage->fill([
            'text' => $requestData['text'],
            'spam_type' => $requestData['spam_type'],
        ]);

        $isSave = $spamMessage->save();

        if ($isSave) {
            $this->dispatchUpdater($request);
        }

        return $isSave;
    }

    public function check(CheckTrainSpamMessageRequest $request): string
    {
        $requestData = $request->validated();
        $text = $requestData['text'];
        $userId = $requestData['user_id'];

        $this->classifier->trainFromDB($userId);
        $classify = $this->classifier->classify($text);

        return SpamTypeHelper::translate($classify);
    }

    public function uploadAndTraining(UpdateAndTrainingTrainSpamMessageRequest $request): void
    {
        $requestData = $request->validated();
        $userId = $requestData['user_id'];
        $files = $requestData['files'];
        $spamType = SpamTypeEnum::from($requestData['spam_type']);

        $loadedFiles = [];
        foreach ($files as $file) {
            $loadedFiles[] = FileService::upload($file, $spamType, $userId);
        }

        foreach ($loadedFiles as $loadedFile) {
            $this->classifier->trainByFileType($loadedFile, $spamType, $userId);
            FileService::removeByFilePath($loadedFile, $userId);
        }
    }

}
