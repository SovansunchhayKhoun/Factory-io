<?php

namespace App\Http\Resources\V1;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
//          'invoice_id' => $this->invoice_id,
//          'product_id' => $this->product_id,
          'qty' => $this->qty,
          'cart_item_price' => $this->cart_item_price,

//          'product_name' => ProductResource::collection (Product::select('name')->where('id', $this->product_id)->get())
          'products' => ProductResource::collection (Product::select(['name', 'price', 'type', 'description', 'id', 'status'])->where('id', $this->product_id)->get())
        ];
    }
}
