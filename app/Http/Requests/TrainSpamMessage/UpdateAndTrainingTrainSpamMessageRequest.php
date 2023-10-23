<?php

namespace App\Http\Requests\TrainSpamMessage;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAndTrainingTrainSpamMessageRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'spam_type' => [
                'int',
                'required',
            ],
            'user_id' => [
                'required',
                Rule::exists('users', 'id'),
            ],
            'files' => [
                'required',
            ],
            'files.*' => 'file|mimes:json|max:10000'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'user_id' => $this->user()->id,
            'spam_type' => $this->post()['data']['spam_type'],
            'files' => $this->allFiles()['data']['files'],
        ]);
    }
}
