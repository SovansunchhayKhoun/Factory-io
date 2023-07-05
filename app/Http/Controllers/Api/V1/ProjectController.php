<?php

  namespace App\Http\Controllers\Api\V1;

  use App\Http\Controllers\Controller;
  use App\Http\Requests\ProjectRequest;
  use App\Http\Resources\V1\CommentResource;
  use App\Http\Resources\V1\ProjectLikeResource;
  use App\Http\Resources\V1\ProjectResource;
  use App\Http\Resources\V1\UserResource;
  use App\Models\Comment;
  use App\Models\Product;
  use App\Models\Project;
  use App\Models\User;
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

    public function find_project ( Request $request )
    {
      return ProjectLikeResource ::collection ( Project ::join ( 'project_likes' , 'projects.id' , '=' , 'project_likes.project_id' ) -> select ( 'projects.*' , 'project_likes.*' ) -> where ( [
        [ 'project_likes.like_state' , '=' , 1 ] ,
        [ 'projects.user_id' , '=' , $request -> user_id ]
      ] ) -> get () );
    }

    public function find_comment ( Request $request )
    {
      return CommentResource ::collection ( Comment ::join ( 'users' , 'users.id' , '=' , 'comments.user_id' )
//        -> join ('projects', 'projects.user_id', '=', 'comments.user_id')
        -> where('users.id', '=', $request->user_id)
        -> select ( 'comments.*' )
        -> orderby('comments.id')
        -> get () );
    }

    public function store ( ProjectRequest $projectRequest )
    {
      $data = $projectRequest -> validated ();
      $projectRequest -> validate ( [
        'image' => [ 'required' , 'image' ] ,
        'file' => [ 'required' , 'mimes:zip,rar,7z,gz' ] ,
      ] );
//      $request -> validate ( [
//        'image' => 'image' ,
//        'file' => 'mimetypes:zip, tar,gz,pdf,7z'
//      ] );
//      if ( $request -> hasFile ( 'image' )
//        && (
//        $request -> file ( 'file' ) -> getClientOriginalExtension () == 'zip' ||
//        $request -> file ( 'file' ) -> getClientOriginalExtension () == 'tar' ||
//        $request -> file ( 'file' ) -> getClientOriginalExtension () == 'gz' ||
//        $request -> file ( 'file' ) -> getClientOriginalExtension () == 'pdf' ||
//        $request -> file ( 'file' ) -> getClientOriginalExtension () == '7z'
//         ) )
      if ( $projectRequest -> hasFile ( 'image' ) && $projectRequest -> file ( 'file' ) ) {
        return Project ::create ( $data );
      }
      return response () -> json ( '...' );
//      abort ('422', 'Cannot process request');
    }

    public function destroy ( Project $project )
    {
      $project -> delete ();
      return response () -> json ( 'Product deleted' );
    }

    public function update ( ProjectRequest $request , Project $project )
    {
      $data = $request -> validated ();
      $project -> update ( $data );
      return response () -> json ( 'Project Updated' );
    }

    public function fetchLastProject ()
    {
      return Project ::latest ( 'id' ) -> first ();
    }
  }
