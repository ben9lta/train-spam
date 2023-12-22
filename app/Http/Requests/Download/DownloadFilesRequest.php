<?php

namespace App\Http\Requests\Download;

use App\Helpers\SpamTypeHelper;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DownloadFilesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'spamTypeList' => [
                'array',
                'required',
                Rule::in(SpamTypeHelper::getValues())
            ],
            'user_id' => [
                'required',
                Rule::exists('users', 'id'),
            ],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'user_id' => $this->user()->id,
        ]);
    }
}
