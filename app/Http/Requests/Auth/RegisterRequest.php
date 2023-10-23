<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'fio'     => ['nullable', 'string', 'max:255'],
            'email'    => ['email', 'max:255', Rule::unique(User::class)],
            'domain'   => ['nullable', 'max:255', 'string', 'url', Rule::unique(User::class)],
        ];
    }
}
