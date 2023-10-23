<?php

namespace App\Policies;

use App\Models\TrainSpamMessage;
use App\Models\User;

class SpamMessagePolicy
{
    public function update(User $user, TrainSpamMessage $spamMessage): bool
    {
        return $user->id === $spamMessage->user_id;
    }
}
