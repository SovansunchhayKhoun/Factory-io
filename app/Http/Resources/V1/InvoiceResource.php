<?php

namespace App\Http\Resources\V1;

use App\Models\InvoiceProduct;
use App\Models\User;
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
            'user_id' => $this->user_id,
            'date' => $this->date,
            'totalPrice' => $this->totalPrice,
            'status' => $this->status,
            'address' => $this->address,
            'placeId' => $this->placeId,
            'payment_pic' => $this->payment_pic,
            'item_count' => $this->item_count,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user' => User::where('id', $this->user_id)->get(),
            'invoice_product' => InvoiceProductResource::collection(InvoiceProduct::where([
                'invoice_id' => $this->id,
            ])->get()),
        ];
    }
}
