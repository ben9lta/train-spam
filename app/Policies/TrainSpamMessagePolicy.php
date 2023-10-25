<?php

namespace App\Policies;

use App\Models\TrainSpamMessage;
use App\Models\User;

class TrainSpamMessagePolicy
{
    public function update(User $user, TrainSpamMessage $spamMessage): bool
    {
        return $user->id === $spamMessage->user_id;
    }
}
