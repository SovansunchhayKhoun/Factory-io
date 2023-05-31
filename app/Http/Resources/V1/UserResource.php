<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     ** @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'gender' => $this->gender,
            'phoneNumber' => $this->phoneNumber,
            'email' => $this->email,
            'username' => $this->username,
            'password' => $this->password,
            'pfp' => $this->pfp,
            'bio' => $this->bio,
            'acc_type' => $this->acc_type,
        ];
    }
}
