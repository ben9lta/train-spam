<?php

namespace App\Listeners;

use App\Events\TrainModelUpdater;
use App\Services\CacheService;

class ClearCache
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(TrainModelUpdater $event): void
    {
        $userId = $event->userId;
        $cacheService = new CacheService($userId);
        $cacheService->clearAllCache();
    }
}
