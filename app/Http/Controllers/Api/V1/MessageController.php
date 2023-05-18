<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

class MessageController extends Controller
{
    public function index() {
      return response() -> json ('Message Index');
    }
}
