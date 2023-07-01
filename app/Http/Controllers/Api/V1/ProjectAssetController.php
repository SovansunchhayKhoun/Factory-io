<?php

  namespace App\Http\Controllers\Api\V1;

  use App\Http\Controllers\Controller;
  use App\Http\Requests\ProjectAssetRequest;
  use App\Http\Resources\V1\ProjectAssetResource;
  use App\Models\Project;
  use App\Models\ProjectAsset;
  use Illuminate\Support\Carbon;
  use Illuminate\Support\Facades\Storage;

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
      }
//      if ( $request -> hasFile ( 'image' ) ) {
//        $imageFile = $request -> file ( 'image' ) -> getClientOriginalName ();
//        $filepath = 'prj-' . $project[ 'id' ] . '-usr-' . $project[ 'user_id' ] . '-' . str_replace ( ' ' , '_' , str_replace ( ':' , '-' , str_split ( $myTime -> toString () , 24 )[ 0 ] ) ) . '/img/' . $imageFile;
//        Storage ::makeDirectory ( public_path ( $filepath ) );
//        Storage ::disk ( 'projects' ) -> put ( $filepath , file_get_contents ( $data[ 'image' ] ) );
//        $data[ 'image' ] = $filepath;
//      }
      ProjectAsset ::create ( $data );

      return response () -> json ( 'Project Assets created' );
    }

    public function download ($id)
    {
//      return $name;
      $projectAsset = ProjectAsset::where('project_id', $id)->first();
//      dd($projectAsset->file);
      $path = public_path ('All-Khmer-Fonts-9-26-15.zip');
//      $path = public_path ('projects\\'.$projectAsset->file);
//      dd($path);
//      dd($path);
//      $headers = array ('Accept' => 'application/octet-stream',
//        'Content-Disposition' => 'attachment; filename="'.$projectAsset->file."\"",
//        'Content-Type' => 'multipart/form-data');
//      return Storage::download ($path, $projectAsset->file, $headers);
      return response ()->download ($path);
    }
  }
