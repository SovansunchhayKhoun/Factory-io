<?php

  namespace App\Http\Controllers\Api\V1;

  use App\Http\Controllers\Controller;
  use App\Http\Requests\CommentRequest;
  use App\Http\Resources\V1\CommentResource;
  use App\Models\Comment;
  use App\Models\Project;
  use App\Models\ProjectAsset;
  use Illuminate\Http\Request;
  use Illuminate\Support\Carbon;
  use Illuminate\Support\Facades\Storage;

  class CommentController extends Controller
  {
    public function index ()
    {
      return CommentResource ::collection ( Comment ::latest () -> orderBy('id', 'desc')-> where ( 'parent_id' , null ) -> get () );
    }

    public function store ( CommentRequest $request )
    {
//      dd($request->file ('image'));
      $data = Comment ::create ( $request -> validated () );
//      Comment ::create ( $data );


      $myTime = Carbon ::now ();
      if ( $request -> hasFile ( 'image' ) ) {
        $filename = $request -> file ( 'image' ) -> getClientOriginalName ();
        $filepath = 'cmt-' . $data [ 'id' ] . '-usr-' . $data[ 'user_id' ] . '-' . str_replace ( ' ' , '_' , str_replace ( ':' , '-' , str_split ( $myTime -> toString () , 24 )[ 0 ] ) ) . '/img/' . $filename;
        Storage ::makeDirectory ( public_path ( $filepath ) );
        Storage ::disk ( 'comments' ) -> put ( $filepath , file_get_contents ( $data[ 'image' ] ) );
        $data[ 'image' ] = $filepath;
//        ProjectAsset ::create ( $data );
      }

      return response () -> json ( 'Comment Created' );
    }

    public function show (Comment $comment)
    {
      return new CommentResource($comment);
    }
  }
