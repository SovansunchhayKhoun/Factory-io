<?php

  namespace App\Http\Controllers\Api\V1;

  use App\Http\Controllers\Controller;
  use App\Http\Requests\ProjectLikeRequest;
  use App\Http\Resources\V1\ProjectLikeResource;
  use App\Models\ProjectLike;
  use Illuminate\Http\Request;

  class ProjectLikeController extends Controller
  {
    public function index ()
    {
      return ProjectLikeResource ::collection ( ProjectLike ::all () );
    }

    public function store ( ProjectLikeRequest $request )
    {
      $data = $request -> validated ();
      return ProjectLike ::create ( $data );
    }

    public function update ( ProjectLikeRequest $request , ProjectLike $projectLike )
    {
      $data = $request -> validated ();
      $projectLike -> update ( $data );

      return response () -> json ( 'Project Liked' );
    }

    public function checkLike ( Request $request )
    {
      $request->validate (
        ['user_id' => 'required'],
        ['project_id' => 'required']
      );

      $data = ProjectLike ::where (
        [
          [ 'user_id' , '=' , $request -> user_id ] ,
          [ 'project_id' , '=' , $request -> project_id ]
        ]
      ) -> first ();

      if($data)
        return $data;
      return response () -> json (false);
//      return ProjectLike ::where (
//        [
//          [ 'user_id' , '=' , $request -> user_id ] ,
//          [ 'project_id' , '=' , $request -> project_id ]
//        ]
//      ) -> first ();
    }
  }
