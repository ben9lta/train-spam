<?php

namespace App\Policies;

use App\Models\SpamMessage;
use App\Models\User;

class SpamMessagePolicy
{
    public function delete(User $user, SpamMessage $spamMessage): bool
    {
        return $user->id === $spamMessage->user_id;
    }
}
