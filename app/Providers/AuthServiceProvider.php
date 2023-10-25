<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\SpamMessage;
use App\Models\TrainSpamMessage;
use App\Policies\SpamMessagePolicy;
use App\Policies\TrainSpamMessagePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        TrainSpamMessage::class => TrainSpamMessagePolicy::class,
        SpamMessage::class      => SpamMessagePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
