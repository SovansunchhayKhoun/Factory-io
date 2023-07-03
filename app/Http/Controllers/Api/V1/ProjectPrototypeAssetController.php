<?php

  namespace App\Http\Controllers\Api\V1;

  use App\Http\Controllers\Controller;
  use App\Http\Requests\ProjectPrototypeAssetRequest;
  use App\Http\Resources\V1\ProjectPrototypeAssetResource;
  use App\Models\Project;
  use App\Models\ProjectPrototypeAsset;
  use Illuminate\Support\Carbon;
  use Illuminate\Support\Facades\Storage;

  class ProjectPrototypeAssetController extends Controller
  {
    public function index ()
    {
      return ProjectPrototypeAssetResource ::collection ( ProjectPrototypeAsset ::all () );
    }

    public function store ( ProjectPrototypeAssetRequest $request )
    {
      $data = $request -> validated ();
      $project = Project ::latest () -> first ();
      $myTime = Carbon ::now ();
      if ( $request -> hasFile ( 'image' ) ) {
        $imageFile = $request -> file ( 'image' ) -> getClientOriginalName ();
        $filepath = 'prj-' . $project[ 'id' ] . '-usr-' . $project[ 'user_id' ] . '-' . str_replace ( ' ' , '_' , str_replace ( ':' , '-' , str_split ( $myTime -> toString () , 24 )[ 0 ] ) ) . '/prtImg/' . $imageFile;
        Storage ::makeDirectory ( public_path ( $filepath ) );
        Storage ::disk ( 'projects' ) -> put ( $filepath , file_get_contents ( $data[ 'image' ] ) );
        $data[ 'image' ] = $filepath;
      }
      return ProjectPrototypeAsset ::create ( $data );
    }

  }
