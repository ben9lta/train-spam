<?php

namespace App\Http\Controllers\Api;


use App\Http\Requests\Api\Auth\LoginAuthRequest;
use Illuminate\Support\Facades\Auth;

class AuthController
{
    public function login(LoginAuthRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();
//        $expiresAt = Carbon::now()->addDays(7);
        $token = $user->createToken('ApiToken')->plainTextToken;

        return response()->json([
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

}
