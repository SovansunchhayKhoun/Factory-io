<?php

namespace App\Http\Resources\V1;

use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
            'msg_content' => $this->msg_content,
            'image' => $this->image,
            'chat_id' => $this->chat_id,
            'sender_id' => $this->sender_id,
            'receiver_id' => $this->receiver_id,
            'time_sent' => $this->time_sent,
            'is_read' => $this->is_read,
        ];
    }
}
