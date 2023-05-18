<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;
    protected $fillable = [
      'msg_content', 'image', 'admin_id', 'sender_id', 'chat_id', 'time_sent'
    ];
    public function chat() : BelongsTo
    {
      return $this -> belongsTo (Chat::class);
    }
}
