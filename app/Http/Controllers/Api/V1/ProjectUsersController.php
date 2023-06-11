<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectUsersRequest;
use App\Http\Resources\V1\ProjectUsersResource;
use App\Models\ProjectUsers;

class ProjectUsersController extends Controller
{
    public function index () {
      return ProjectUsersResource::collection (ProjectUsers::all ());
    }
    public function store(ProjectUsersRequest $request) {
      $data = $request->validated ();
      ProjectUsers::create($data);

      return response ()->json ('Project Users created');
    }
}
