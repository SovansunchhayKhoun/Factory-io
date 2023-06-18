<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProjectPrototypeResource;
use App\Models\ProjectPrototype;

class ProjectPrototypeController extends Controller
{
    public function index ()
    {
      return ProjectPrototypeResource::collection (ProjectPrototype::all ());
    }
}
