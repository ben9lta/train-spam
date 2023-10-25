<?php

namespace App\Http\Requests\Api\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginAuthRequest extends FormRequest
{
    public function rules()
    {
        return [
            'email' => 'required|email|string',
            'password' => 'required|string',
        ];
    }

    protected function prepareForValidation()
    {
        return 123;
    }
}
