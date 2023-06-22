<?php

namespace App\Http\Resources\V1;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeliveryAddressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
      return [
        'id' => $this->id,
        'address' => $this->address,
        'placeId' => $this->placeId,
        'user_id' => $this->user_id,
        'user' => User::where('id', $this->user_id)->get(),
      ];
    }
}
