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
  use App\Models\ProjectAsset;
  use App\Models\ProjectImage;
  use App\Models\User;
  use http\Env\Response;
  use Illuminate\Http\Request;
  use Illuminate\Support\Carbon;
  use Illuminate\Support\Facades\Storage;
  use Illuminate\Support\Str;

  class ProjectController extends Controller
  {
    public function index ()
    {
      return ProjectResource ::collection ( Project ::orderby ( 'id' , 'desc' ) -> get () );
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
        -> where ( 'users.id' , '=' , $request -> user_id )
        -> select ( 'comments.*' )
        -> orderby ( 'comments.id' )
        -> get () );
    }

    public function store ( ProjectRequest $projectRequest )
    {
      $data = $projectRequest -> validated ();
      $projectRequest -> validate ( [
        'image' => [ 'required' , 'image' ] ,
        'file' => [ 'required' , 'mimes:zip,rar,7z,gz,pdf,tar' ] ,
      ] );
      if ( $projectRequest -> hasFile ( 'image' ) && $projectRequest -> file ( 'file' ) ) {
        return Project ::create ( $data );
      }
      return response () -> json ( '...' );

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

    public function destroy ( Project $project )
    {
      $project_images = ProjectImage ::where ( 'project_id' , $project -> id ) -> get ();
      $storage = Storage ::disk ( 'projects' );
      $project_asset = ProjectAsset ::where ( 'project_id' , $project -> id ) -> first ();

      // delete zip
      if ( $storage -> exists ( $project_asset -> file ) ) {
        $storage -> delete ( $project_asset -> file );
      }

      // delete images
      foreach ( $project_images as $image ) {
        if ( $storage -> exists ( $image -> image ) ) {
          $storage -> delete ( $image -> image );
        }
      }

      $project -> delete ();
      $project -> project_prototypes () -> delete ();
      $project -> project_assets () -> delete ();
      $project -> project_images () -> delete ();
      $project -> project_likes () -> delete ();
      $project -> project_saves () -> delete ();
      $project -> fundings () -> delete ();
      $project -> comments () -> delete ();

      return response () -> json ( 'Project Deleted' );
    }
  }
