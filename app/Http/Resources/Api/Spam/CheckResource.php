<?php

namespace App\Http\Resources\Api\Spam;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CheckResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }

}
