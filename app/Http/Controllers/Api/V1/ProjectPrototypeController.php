<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

class ProjectPrototypeController extends Controller
{
    public function index ()
    {
      return response ()->json ('Index Prototype');
    }
}
