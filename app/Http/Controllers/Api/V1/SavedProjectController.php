<?php

  namespace App\Http\Controllers\Api\V1;

  use App\Http\Controllers\Controller;
  use App\Http\Requests\SavedProjectRequest;
  use App\Http\Resources\V1\SavedProjectResource;
  use App\Models\SavedProject;
  use Illuminate\Http\Request;

  class SavedProjectController extends Controller
  {
    public function index ()
    {
      return SavedProjectResource ::collection ( SavedProject ::orderby ( 'updated_at' ) -> get () );
    }

    public function store ( SavedProjectRequest $savedProjectRequest )
    {
      $data = $savedProjectRequest -> validated ();
      return SavedProject ::create ( $data );
    }

    public function update ( SavedProjectRequest $request , SavedProject $savedProject )
    {
      $data = $request -> validated ();
      $savedProject -> update ( $data );


      return response () -> json ( 'Saved Project Updated' );
    }

    public function checkUserSave ( Request $request )
    {
      $data = SavedProject ::where ( [
        [ 'user_id' , $request -> user_id ] ,
        [ 'project_id' , $request -> project_id ]
      ] ) -> first ();

      if ( $data )
        return $data;
      return response () -> json ( false );
    }
  }
