<?php

  namespace App\Http\Resources\V1;

  use App\Models\Message;
  use App\Models\User;
  use Illuminate\Http\Request;
  use Illuminate\Http\Resources\Json\JsonResource;

  class ChatResource extends JsonResource
  {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray ( Request $request ) : array
    {
      return [
        'id' => $this -> id ,
        'sender_id' => $this -> sender_id ,
        'receiver_id' => $this -> receiver_id ,
        'created_at' => $this -> created_at ,
        'updated_at' => $this -> updated_at ,
        'messages' => MessageResource ::collection ( Message ::where ( [ 'chat_id' => $this -> id ] ) -> get () ) ,
        'users' => UserResource ::collection ( User ::where ( 'username' , $this -> sender_id ) -> orWhere ( 'username' , $this -> receiver_id ) -> get () )
      ];
    }
  }
