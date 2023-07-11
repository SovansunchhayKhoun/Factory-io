<?php

  namespace App\Http\Controllers\Api\V1;

  use App\Http\Controllers\Controller;
  use App\Http\Requests\ChatRequest;
  use App\Http\Resources\V1\ChatResource;
  use App\Models\Chat;
  use http\Env\Response;
  use Illuminate\Http\Request;

  class ChatController extends Controller
  {
    public function index ()
    {
      return ChatResource ::collection ( Chat ::latest () -> get () );
    }

    public function store ( ChatRequest $request )
    {
      $data = $request -> validated ();

      $sender = $request -> sender_id;
      $receiver = $request -> receiver_id;

      if ( $sender !== $receiver ) {
        $check = Chat ::where ( [
          [ 'sender_id' , '=' , $sender ] ,
          [ 'receiver_id' , '=' , $receiver ]
        ] ) -> orWhere ( [
          [ 'sender_id' , '=' , $receiver ] ,
          [ 'receiver_id' , '=' , $sender ]
        ] ) -> first ();

        if ( $check ) {
          return response () -> json ( false );
        } else {
          return Chat ::create ( $data );
        }
      }

    }

//    public function checkChat ( Request $request )
//    {
////      dd($request->sender);
////      dd($request->receiver);
//      $sender = $request -> sender;
//      $receiver = $request -> receiver;
//      $data = Chat ::where ( [
//        [ 'sender_id' , '=' , $sender ] ,
//        [ 'receiver_id' , '=' , $receiver ]
//      ] ) -> orWhere ( [
//        [ 'sender_id' , '=' , $receiver ] ,
//        [ 'receiver_id' , '=' , $sender ]
//      ] ) -> first ();
//
//      if ( $data ) {
//        return response () -> json ( $data );
//      }
//      return response () -> json ( false );
////      dd($data);
//    }

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

