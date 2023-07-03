<?php

  namespace App\Http\Controllers\Api\V1;

  use App\Http\Controllers\Controller;
  use App\Http\Requests\ProjectPrototypeRequest;
  use App\Http\Resources\V1\ProjectPrototypeResource;
  use App\Models\Project;
  use App\Models\ProjectPrototype;
  use Illuminate\Support\Carbon;
  use Illuminate\Support\Facades\Storage;

  class ProjectPrototypeController extends Controller
  {
    public function index ()
    {
      return ProjectPrototypeResource ::collection ( ProjectPrototype ::all () );
    }

    public function store ( ProjectPrototypeRequest $request )
    {
      $data = $request -> validated ();
      $request -> validate ( [
        'image' => 'required|image'
      ] );

      return ProjectPrototype ::create ( $data );
    }

    public function prototypes ( $id )
    {
      return ProjectPrototypeResource ::collection ( ProjectPrototype ::where ( 'project_id' , $id ) -> get () );
    }
  }
