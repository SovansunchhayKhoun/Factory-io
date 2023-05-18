<?php

  namespace App\Http\Resources\V1;

  use App\Models\Product;
  use App\Models\User;
  use Illuminate\Http\Request;
  use Illuminate\Http\Resources\Json\JsonResource;

  class InvoiceProductResource extends JsonResource
  {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray ( Request $request ) : array
    {
      return [
        'id' => $this->id,
        'invoice_id' => $this -> invoice_id ,
        'product_id' => $this -> product_id ,
        'user_id' => $this -> user_id ,
        'qty' => $this -> qty ,
        'cart_item_price' => $this -> cart_item_price ,
        'products' => ProductResource ::collection ( Product :: where ( 'id' , $this -> product_id ) -> get () )
      ];
    }
  }
