<?php

namespace App\Traits;

use App\Events\TrainModelUpdater;
use App\Repository\TrainSpamRepository\TrainSpamRepositoryInterface;
use Illuminate\Http\Request;

trait TrainSpamTrait
{
    use UserRequestTrait;
    protected TrainSpamRepositoryInterface $trainSpamRepository;

    public function __construct()
    {
        $this->trainSpamRepository = app(TrainSpamRepositoryInterface::class);
    }

    /**
     * $user - аргумент для определения userId, если int, то сразу передать userId
     * @param Request|int $user
     * @return TrainSpamRepositoryInterface
     */
    private function getTrainSpamRepository(Request|int $user): TrainSpamRepositoryInterface
    {
        if ($user instanceof Request) {
            $userId = $this->getUser($user);
        } elseif (gettype($user) === 'integer') {
            $userId = $user;
        } else {
            $userId = 0;
        }

        $this->trainSpamRepository->setUser($userId);
        return $this->trainSpamRepository;
    }

    private function dispatchUpdater(Request $request): void
    {
        $userId = $this->getUser($request);
        TrainModelUpdater::dispatch($userId);
    }

}
