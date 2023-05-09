<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
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
          'date' => $this->date,
          'totalPrice' => $this->totalPrice,
          'status' => $this->status,
          'address' => $this->address,
          'payment_pic' => $this->payment_pic,
          'created_at' => $this->created_at,
          'updated_at' => $this->updated_at,
        ];
    }
}
