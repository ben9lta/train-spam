<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainSpamMessage\CheckTrainSpamMessageRequest;
use App\Http\Requests\TrainSpamMessage\UpdateAndTrainingTrainSpamMessageRequest;
use App\Http\Requests\TrainSpamMessage\UpdateTrainSpamMessageRequest;
use App\Models\SpamMessage;
use App\Models\TrainSpamMessage;
use App\Services\SpamMessages\SpamMessagesService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SpamController extends Controller
{

    public function __construct(private readonly SpamMessagesService $spamMessagesService)
    {
    }

    public function paginateUserMessages(Request $request, int $page = 1)
    {
        return $this->spamMessagesService->paginateUserMessages($request, $page);
    }

    public function paginateIncomingUserMessages(Request $request, int $page = 1): LengthAwarePaginator
    {
        return $this->spamMessagesService->paginateIncomingUserMessages($request, $page);
    }

    /**
     * @throws AuthorizationException
     */
    public function update(UpdateTrainSpamMessageRequest $request, TrainSpamMessage $spamMessage): bool
    {
        $this->authorize('update', $spamMessage);
        return $this->spamMessagesService->update($request, $spamMessage);
    }

    public function incomingMessageDelete(Request $request, SpamMessage $spamMessage): bool
    {
        $this->authorize('delete', $spamMessage);
        return $this->spamMessagesService->deleteIncomingMessage($spamMessage);
    }

    public function train(Request $request): Response
    {
        return Inertia::render('Spam/Train');
    }

    public function checker(Request $request): Response
    {
        return Inertia::render('Spam/Check');
    }

    public function check(CheckTrainSpamMessageRequest $request): array
    {
        return $this->spamMessagesService->check($request);
    }

    public function uploadAndTraining(UpdateAndTrainingTrainSpamMessageRequest $request): void
    {
        $this->spamMessagesService->uploadAndTraining($request);
    }
}
