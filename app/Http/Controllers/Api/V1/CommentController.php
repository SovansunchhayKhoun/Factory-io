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
//      return CommentResource ::collection ( Comment ::latest () -> where ( 'parent_id' , null ) -> get () );
      return CommentResource ::collection ( Comment ::latest () -> get () );
    }

    public function comment_notification ()
    {
      return CommentResource ::collection ( Comment ::latest () -> where ( [ [ 'comment_indicator' , '!=' , 0 ] ] ) -> get () );
    }

    public function store ( CommentRequest $request )
    {
//      dd($request->file ('image'));
      $data = $request -> validated ();
//      Comment ::create ( $data );
//      dd($data);
//      dd($data);
      $request -> validate ( [
        'image' => [ 'nullable', 'image' ]
      ] );

      $myTime = Carbon ::now ();
      if ( $request -> hasFile ( 'image' ) ) {
        $imageFile = $request -> file ( 'image' ) -> getClientOriginalName ();
        $filepath = 'usr-' . $data[ 'user_id' ] . '-'
          . str_replace ( ' ' , '_' ,
            str_replace ( ':' , '-' , str_split ( $myTime -> toString () , 24 )[ 0 ] ) ) . '/img/' . $imageFile;
        Storage ::makeDirectory ( public_path ( $filepath ) );
//      dd(Storage ::makeDirectory ( public_path ( $filepath ) ));
        Storage ::disk ( 'comments' ) -> put ( $filepath , file_get_contents ( $data[ 'image' ] ) );
        $data[ 'image' ] = $filepath;
      }
      return Comment ::create ( $data );
//      return response ()->json ('An error occurred');
    }

    public function show ( Comment $comment )
    {
      return new CommentResource( $comment );
    }

    public function update ( CommentRequest $request , Comment $comment )
    {
      $data = $request -> validated ();
      $comment -> update ( $data );
      return response () -> json ( 'Comment Updated' );
    }
  }
