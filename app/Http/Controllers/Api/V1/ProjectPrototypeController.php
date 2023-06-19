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
      return ProjectPrototypeResource::collection (ProjectPrototype::all ());
    }

    public function store (ProjectPrototypeRequest $request)
    {
      $data = $request->validated ();
      $project = Project::latest()->first();
      $myTime = Carbon ::now ();
      if ( $request -> hasFile ( 'image' ) ) {
        $imageFile = $request -> file ( 'image' ) -> getClientOriginalName ();
        $filepath = 'prj-' . $project[ 'id' ] . '-usr-' . $project[ 'user_id' ] . '-' . str_replace ( ' ' , '_' , str_replace ( ':' , '-' , str_split ( $myTime -> toString () , 24 )[ 0 ] ) ) . '/prtImg/' . $imageFile;
        Storage ::makeDirectory ( public_path ( $filepath ) );
        Storage ::disk ( 'projects' ) -> put ( $filepath , file_get_contents ( $data[ 'image' ] ) );
        $data[ 'image' ] = $filepath;
      }

      ProjectPrototype::create($data);
      return response()->json ('Prototype Created');
    }

    public function prototypes ($id) {
      return ProjectPrototypeResource::collection (ProjectPrototype::where('project_id', $id)->get());
    }
}
