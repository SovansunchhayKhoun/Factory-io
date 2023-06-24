<?php

  namespace App\Http\Controllers\Api\V1;

  use App\Http\Controllers\Controller;
  use App\Http\Requests\ChatRequest;
  use App\Http\Resources\V1\ChatResource;
  use App\Models\Chat;
  use Illuminate\Http\Request;

  class ChatController extends Controller
  {
    public function index ()
    {
      return ChatResource ::collection ( Chat ::all () );
    }

    public function store ( ChatRequest $request )
    {
      $data = $request -> validated ();

      return Chat ::create ( $data );
    }

    public function getChat ( Request $request )
    {
      $sender = $request -> sender;
      $receiver = $request -> receiver;
      return Chat ::where ( [
        'sender_id' => $sender ,
        'receiver_id' => $receiver
      ] ) -> orWhere ( [
        'receiver_id' => $sender ,
        'sender_id' => $receiver
      ] ) -> first ();
    }
  }

