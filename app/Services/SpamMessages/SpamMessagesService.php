<?php

namespace App\Services\SpamMessages;

use App\Enums\SpamTypeEnum;
use App\Helpers\SpamTypeHelper;
use App\Http\Requests\TrainSpamMessage\CheckTrainSpamMessageRequest;
use App\Http\Requests\TrainSpamMessage\UpdateAndTrainingTrainSpamMessageRequest;
use App\Http\Requests\TrainSpamMessage\UpdateTrainSpamMessageRequest;
use App\Models\SpamMessage;
use App\Models\TrainSpamMessage;
use App\Services\FileService;
use App\Services\MessageClassifier;
use App\Traits\TrainSpamTrait;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

    public function paginateIncomingUserMessages(Request $request, int $page = 1): LengthAwarePaginator
    {
        $userId = $this->getUser($request);

        return SpamMessage::query()
            ->select('id', 'text', 'spam_type', 'request', 'created_at')
            ->where('user_id', $userId)
            ->orderByDesc('id')
            ->paginate(10, page: $page);
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

    public function deleteIncomingMessage(SpamMessage $spamMessage): bool
    {
        return $spamMessage->delete();
    }

    public function check(CheckTrainSpamMessageRequest $request): array
    {
        $requestData = $request->validated();
        $text = $requestData['text'];
        $userId = $requestData['user_id'];

        $this->classifier->trainFromDB($userId);
        $classify = $this->classifier->classify($text);

        $translateType = SpamTypeHelper::translate($classify);

        return [
            'type' => $classify,
            'translate' => $translateType,
        ];
    }

    public function insertSpamMessage(CheckTrainSpamMessageRequest $request, int $spamType): bool
    {
        $validated = $request->validated();

        if ($validated && isset($validated['request'])) {
            $text = $validated['text'];
            $userId = $validated['user_id'];
            $requestData = $validated['request'];
            $hashedText = md5($text);

            $model = SpamMessage::query()->firstOrNew([
                'user_id' => $userId,
                'hashed_text' => $hashedText,
            ]);

            if (!$model->exists) {
                $model->fill([
                    'request' => $requestData,
                    'text' => $text,
                    'hashed_text' => $hashedText,
                    'user_id' => $userId,
                    'spam_type' => $spamType
                ]);

                return $model->save();
            }
        }

        return false;
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
