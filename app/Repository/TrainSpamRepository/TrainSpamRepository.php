<?php

namespace App\Repository\TrainSpamRepository;

use App\Services\CacheService;
use Illuminate\Support\Facades\DB;

class TrainSpamRepository implements TrainSpamRepositoryInterface
{
    const TABLE_NAME = 'train_spam_messages';
    public CacheService $cacheService;
    private int $userId;

    public function __construct(int $userId = 0)
    {
        $this->userId = $userId;
        $this->cacheService = new CacheService($userId);
    }

    public function setUser(int $userId): static
    {
        $this->userId = $userId;
        $this->cacheService->setUser($userId);

        return $this;
    }

    public function getUser(): int
    {
        return $this->userId;
    }

    public function getUserTrainModelCount(): mixed
    {
        $cacheKey = $this->cacheService->getUserTrainModelCountCacheKey();
        $cacheModel = $this->cacheService->get($cacheKey);

        if (!$cacheModel) {
            $cacheModel = DB::query()
                ->from(self::TABLE_NAME)
                ->where('user_id', $this->userId)
                ->count();

            $this->cacheService->set($cacheKey, fn() => $cacheModel);
        }

        return $cacheModel;
    }

    public function getUserTrainModel(): mixed
    {
        $cacheKey = $this->cacheService->getUserTrainModelCacheKey();
        $cacheModel = $this->cacheService->get($cacheKey);

        if (!$cacheModel) {
            $cacheModel = DB::query()->select('text', 'hashed_text', 'spam_type')
                ->from(self::TABLE_NAME)
                ->where('user_id', $this->userId)
                ->get()
                ->toArray();

            $this->cacheService->set($cacheKey, fn() => $cacheModel);
        }

        return $cacheModel;
    }

    public function getUserPaginateTrainModel(int $page = 1): mixed
    {
        $cacheKey = $this->cacheService->getUserPaginateTrainModelCacheKey($page);
        $cacheModel = $this->cacheService->get($cacheKey);

        if (!$cacheModel) {
            $cacheModel = DB::query()
                ->select('id', 'text', 'spam_type')
                ->from(self::TABLE_NAME)
                ->where('user_id', $this->userId)
                ->orderBy('spam_type')
                ->orderByDesc('id')
                ->paginate(20, page: $page);

            $this->cacheService->set($cacheKey, fn() => $cacheModel);
        }

        return $cacheModel;
    }
}
