<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\MessageRequest;
use App\Http\Resources\V1\MessageResource;
use App\Models\Message;

class MessageController extends Controller
{
    public function index() {
       return MessageResource::collection (Message::query ()->selectRaw ('*')->orderBy ('time_sent', 'asc')->get());
//       dd($msg);
//      return MessageResource::collection (Message::all());
//      return Message->all();
    }
    public function store(MessageRequest $request) {
//      dd($request);
      Message::create($request->validated ());
      return response () -> json ('Message Created');
    }

    public function update (MessageRequest $request, Message $message) {
      $message->update($request->validated ());
      return response () -> json ('Message updated');
    }
}
