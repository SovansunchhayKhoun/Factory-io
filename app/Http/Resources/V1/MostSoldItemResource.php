<?php

namespace App\Http\Resources\V1;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MostSoldItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
          'product_id' => $this->product_id,
          'totalSold' => $this->totalSold,
          'product' => Product::where('id', $this->product_id)->get()
        ];
    }
}
