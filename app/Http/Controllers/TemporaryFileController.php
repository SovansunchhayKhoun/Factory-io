<?php

  namespace App\Http\Controllers;

  use App\Http\Requests\TemporaryFileRequest;
  use App\Models\TemporaryFile;
  use Illuminate\Http\Request;
  use Illuminate\Support\Facades\Storage;

  class TemporaryFileController extends Controller
  {

    public function store ( TemporaryFileRequest $request )
    {
      if ( $request -> hasFile ( 'file' ) ) {
        $file = $request -> file ( 'file' );
        $filename = $file -> getClientOriginalName 	();
        $folder = uniqid ( 'post' , true );
        $file->storeAs ('/posts/tmp/'.$folder, $filename);

        TemporaryFile ::create ( [
          'folder' => $folder ,
          'file' => $filename
        ] );

        return $folder;
      }
      return '';
    }

    public function delete ( Request $request )
    {
      return response () -> json ( 'Delete Tmp' );
    }
  }
