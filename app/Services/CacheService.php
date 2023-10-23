<?php

namespace App\Services;

use Closure;
use Illuminate\Support\Facades\Cache;

class CacheService
{
    private int $userId;
    private int $ttl = 60 * 15;

    public  CONST USER_CACHES_KEY = 'user_caches';
    public  CONST TRAIN_MODEL_USER_KEY = 'train_model_user_%s';
    public  CONST TRAIN_MODEL_COUNT_USER_KEY = 'train_model_count_user_%s';
    public  CONST PAGINATE_TRAIN_MODEL_USER_PAGE_KEY = 'paginate_train_model_user_%s_page_%s';

    public function __construct(int $userId)
    {
        $this->userId = $userId;
    }

    public function setUser(int $userId): static
    {
        $this->userId = $userId;
        return $this;
    }

    public function getUser(): int
    {
        return $this->userId;
    }

    public function getUserCachesArray(): array
    {
        return Cache::get(self::USER_CACHES_KEY) ?? [];
    }

    public function addUserCacheKey(string $cacheKey): static
    {
        $userCaches = $this->getUserCachesArray();
        if (!isset($userCaches[$cacheKey])) {
            $userCaches[] = $cacheKey;
            Cache::set(self::USER_CACHES_KEY, $userCaches, $this->ttl);
        }

        return $this;
    }

    public function getUserTrainModelCacheKey(): string
    {
        return sprintf(self::TRAIN_MODEL_USER_KEY, $this->userId);
    }

    public function getUserTrainModelCountCacheKey(): string
    {
        return sprintf(self::TRAIN_MODEL_COUNT_USER_KEY, $this->userId);
    }

    public function getUserPaginateTrainModelCacheKey(int $page = 1): string
    {
        return sprintf(self::PAGINATE_TRAIN_MODEL_USER_PAGE_KEY, $this->userId, $page);
    }

    public function clearAllCache(): static
    {
        foreach ($this->getUserCachesArray() as $cacheKey)
        {
            Cache::delete($cacheKey);
        }

        Cache::delete(self::USER_CACHES_KEY);

        return $this;
    }

    public function get(string $cacheKey)
    {
        if (Cache::has($cacheKey)) {
            $type = gettype(Cache::get($cacheKey));
            $cache = Cache::get($cacheKey);

            if ($type === 'array' && count($cache) === 0) {
                Cache::delete($cacheKey);
                return null;
            }

            return $cache;
        }

        return null;
    }

    public function set(string $cacheKey, Closure $data): static
    {
        Cache::remember($cacheKey, $this->ttl, $data);
        $this->addUserCacheKey($cacheKey);

        return $this;
    }


}
