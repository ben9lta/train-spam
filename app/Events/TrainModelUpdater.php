<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TrainModelUpdater
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public int $userId;
    /**
     * Create a new event instance.
     */
    public function __construct(int $userId)
    {
        $this->userId = $userId;
    }

}
