<?php

  namespace App\Http\Controllers\Api\V1;

  use App\Http\Controllers\Controller;
  use App\Http\Requests\CommentRequest;
  use App\Http\Resources\V1\CommentResource;
  use App\Models\Comment;
  use App\Models\Project;
  use Illuminate\Http\Request;

  class CommentController extends Controller
  {
    public function index ()
    {
      return CommentResource ::collection ( Comment ::latest () -> orderBy('id', 'desc')-> where ( 'parent_id' , null ) -> get () );
    }

    public function store ( CommentRequest $request )
    {
      $data = $request -> validated ();
      Comment ::create ( $data );

      return response () -> json ( 'Comment Created' );
    }

    public function show (Comment $comment)
    {
      return new CommentResource($comment);
    }
  }
