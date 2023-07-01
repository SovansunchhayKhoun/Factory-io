<?php

  namespace App\Http\Controllers\Api\V1;

  use App\Http\Controllers\Controller;
  use App\Http\Requests\ProjectImageRequest;
  use App\Http\Resources\V1\ProjectImageResource;
  use App\Models\Project;
  use App\Models\ProjectImage;
  use Illuminate\Support\Carbon;
  use Illuminate\Support\Facades\Storage;

  class ProjectImageController extends Controller
  {
    public function index ()
    {
      return ProjectImageResource ::collection ( ProjectImage ::latest () -> get () );
    }

    public function store ( ProjectImageRequest $request )
    {
      $data = $request -> validated ();
//      dd($data);
      $project = Project ::latest () -> first ();
      $myTime = Carbon ::now ();
      if ( $request -> hasFile ( 'image' ) ) {
        $imageFile = $request -> file ( 'image' ) -> getClientOriginalName ();
        $filepath = 'prj-' . $project[ 'id' ] . '-usr-' . $project[ 'user_id' ] . '-' . str_replace ( ' ' , '_' , str_replace ( ':' , '-' , str_split ( $myTime -> toString () , 24 )[ 0 ] ) ) . '/img/' . $imageFile;
        Storage ::makeDirectory ( public_path ( $filepath ) );
        Storage ::disk ( 'projects' ) -> put ( $filepath , file_get_contents ( $data[ 'image' ] ) );
        $data[ 'image' ] = $filepath;
      }
      return ProjectImage ::create ( $data );
    }
  }
