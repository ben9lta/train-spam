<?php

namespace App\Traits;

use Illuminate\Http\Request;

trait UserRequestTrait
{
    private function getUser(Request $request)
    {
        $userId = 0;
        if ($user = $request->user()) {
            $userId = $user->id;
        }

        return $userId;
    }
}
