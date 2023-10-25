<?php

namespace App\Http\Requests\TrainSpamMessage;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CheckTrainSpamMessageRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'text' => [
                'string',
                'required',
            ],
            'request' => [
                'string',
                'nullable'
            ],
            'user_id' => [
                'required',
                Rule::exists('users', 'id'),
            ],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'user_id' => $this->user()->id,
        ]);
    }
}
