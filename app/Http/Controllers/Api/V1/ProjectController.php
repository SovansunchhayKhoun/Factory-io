<?php

  namespace App\Http\Controllers\Api\V1;

  use App\Http\Controllers\Controller;
  use App\Http\Requests\ProjectRequest;
  use App\Http\Resources\V1\ProjectResource;
  use App\Models\Product;
  use App\Models\Project;
  use http\Env\Response;
  use Illuminate\Http\Request;
  use Illuminate\Support\Carbon;
  use Illuminate\Support\Facades\Storage;

  class ProjectController extends Controller
  {
    public function index ()
    {
      return ProjectResource ::collection ( Project ::all () );
    }

    public function show ( Project $project )
    {
      return new ProjectResource( $project );
    }

    public function store ( ProjectRequest $request )
    {
      $data = $request -> validated ();
      if ( $request -> hasFile ( 'image' )
        && (
        $request -> file ( 'file' ) -> getClientOriginalExtension () == 'zip' ||
        $request -> file ( 'file' ) -> getClientOriginalExtension () == 'tar' ||
        $request -> file ( 'file' ) -> getClientOriginalExtension () == 'gz' ||
        $request -> file ( 'file' ) -> getClientOriginalExtension () == 'pdf' ||
        $request -> file ( 'file' ) -> getClientOriginalExtension () == '7z'
         ) ) {
//        Project ::create ( $data );
        return Project ::create ( $data );
      }
      return response () -> json ('...');
//      abort ('422', 'Cannot process request');
    }

    public function destroy ( Project $project )
    {
      $project -> delete ();
      return response () -> json ( 'Product deleted' );
    }

    public function fetchLastProject ()
    {
      return Project ::latest ( 'id' ) -> first ();
    }
  }
