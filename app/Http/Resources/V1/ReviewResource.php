<?php

namespace App\Http\Resources\V1;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'product_id' => $this->product_id,
            'user_id' => $this->user_id,
            'image' => $this->image,
            'user' => User::where('id', $this->user_id)->get(),
            'product' => Product::where('id', $this->product_id)->get(),
            'created_at' => $this->created_at,
        ];
    }
}
