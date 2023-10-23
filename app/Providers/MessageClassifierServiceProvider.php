<?php

namespace App\Providers;

use App\Services\MessageClassifier;
use Illuminate\Support\ServiceProvider;

class MessageClassifierServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton('messageClassifier', function ($app) {
            return new MessageClassifier();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
