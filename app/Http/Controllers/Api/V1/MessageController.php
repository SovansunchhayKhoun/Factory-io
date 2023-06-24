<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\MessageRequest;
use App\Http\Resources\V1\MessageResource;
use App\Models\Message;
use Illuminate\Support\Facades\Storage;

class MessageController extends Controller
{
    public function index()
    {
//        return MessageResource::collection(Message::query()->selectRaw('*')->orderBy('time_sent', 'asc')->get());
        return MessageResource::collection(Message::orderBy('time_sent', 'asc')->get());
        //       dd($msg);
        //      return MessageResource::collection (Message::all());
        //      return Message->all();
    }

    public function store(MessageRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            $filename = $request->file('image')->getClientOriginalName();
            $filepath = 'messages/'.$filename;
            Storage::disk('messages')->put($filename, file_get_contents($data['image']));
            $data['image'] = $filepath;
        }
        Message::create($data);

        return response()->json('Message Created');
    }

    public function update(MessageRequest $request, Message $message)
    {
        $message->update($request->validated());

        return response()->json('Message updated');
    }
}
