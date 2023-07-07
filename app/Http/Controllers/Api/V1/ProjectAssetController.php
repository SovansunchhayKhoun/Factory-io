<?php

  namespace App\Http\Controllers\Api\V1;

  use App\Http\Controllers\Controller;
  use App\Http\Requests\ProjectAssetRequest;
  use App\Http\Resources\V1\ProjectAssetResource;
  use App\Models\Project;
  use App\Models\ProjectAsset;
  use App\Models\TemporaryFile;
  use Illuminate\Http\Request;
  use Illuminate\Support\Carbon;
  use Illuminate\Support\Facades\Storage;
  use Response;
  use File;

  class ProjectAssetController extends Controller
  {
    public function index ()
    {
      return ProjectAssetResource ::collection ( ProjectAsset ::all () );
    }

    public function store ( ProjectAssetRequest $request )
    {
      $data = $request -> validated ();
      $project = Project ::latest () -> first ();
      $myTime = Carbon ::now ();
      if ( $request -> hasFile ( 'file' ) ) {
        $filename = $request -> file ( 'file' ) -> getClientOriginalName ();
        $filepath = 'prj-' . $project [ 'id' ] . '-usr-' . $project[ 'user_id' ] . '-' . str_replace ( ' ' , '_' , str_replace ( ':' , '-' , str_split ( $myTime -> toString () , 24 )[ 0 ] ) ) . '/src/' . $filename;
        Storage ::makeDirectory ( public_path ( $filepath ) );
        Storage ::disk ( 'projects' ) -> put ( $filepath , file_get_contents ( $data[ 'file' ] ) );
        $data[ 'file' ] = $filepath;
        ProjectAsset ::create ( $data );
      }

      return response () -> json ( 'Project Assets created' );
    }

    public function download ( Request $request )
    {
      $projectAsset = ProjectAsset ::where ( 'project_id' , $request -> id ) -> first ();
//      $file = Storage ::disk ( 'projects' ) -> get ( $projectAsset -> file );

      if ( Storage ::disk ( 'projects' ) -> exists ( $projectAsset -> file ) ) {
        $path = Storage ::disk ( 'projects' ) -> path ( $projectAsset -> file );
        $content = file_get_contents ( $path );

        return response ( $content ) -> withHeaders ( [
          'Content-Type' => mime_content_type ( $path )
        ] );
      }
      return response () -> json ( 'File does not exist.' );
    }
  }
