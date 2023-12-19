<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TrainSpamMessage\CheckTrainSpamMessageRequest;
use App\Http\Resources\Api\Spam\CheckResource;
use App\Services\SpamMessages\SpamMessagesService;
use Illuminate\Http\Request;

class SpamController extends Controller
{

    public function __construct(private readonly SpamMessagesService $spamMessagesService)
    {
    }

    public function paginateUserMessages(Request $request, int $page = 1)
    {
        return $this->spamMessagesService->paginateUserMessages($request, $page);
    }

    public function check(CheckTrainSpamMessageRequest $request): CheckResource
    {
        $data = $this->spamMessagesService->check($request);
        $this->spamMessagesService->insertSpamMessage($request, $data['type']);
        return new CheckResource($data);
    }

}
