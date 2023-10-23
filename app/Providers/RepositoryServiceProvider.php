<?php

namespace App\Providers;

use App\Repository\TrainSpamRepository\TrainSpamRepository;
use App\Repository\TrainSpamRepository\TrainSpamRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(TrainSpamRepositoryInterface::class, TrainSpamRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
