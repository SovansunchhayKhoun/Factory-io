<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChatRequest;
use App\Http\Resources\V1\ChatResource;
use App\Models\Chat;

class ChatController extends Controller
{
    public function index () {
      return ChatResource::collection (Chat::all ());
    }
    public function store (ChatRequest $request) {
      Chat::create($request->validated ());
      return response () -> json ('Chat created');
    }

}
