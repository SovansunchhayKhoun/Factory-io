<?php

  namespace App\Http\Controllers\Api\V1;

  use App\Http\Controllers\Controller;
  use App\Http\Requests\StoreProductRequest;
  use App\Http\Requests\UpdateProductRequest;
  use App\Http\Resources\V1\ProductResource;
  use App\Models\Product;
  use Illuminate\Support\Facades\DB;
  use Illuminate\Support\Facades\Storage;

  class ProductController extends Controller
  {
    public function changeImage ( UpdateProductRequest $request )
    {
      $data = $request -> validated ();
      dd ( $data );
    }

    public function getAllItems ()
    {
      return ProductResource ::collection ( Product ::all () );
    }

    public function getAllType ()
    {
      return DB ::table ( 'products' ) -> select ( DB ::raw ( 'type' ) ) -> groupBy ( 'type' ) -> get ();
    }

    public function fetchItems ()
    {
      return ProductResource ::collection ( Product ::latest () -> paginate ( 10 ) );
    }

    public function fetchItemsPaginate ( $type )
    {
      return ProductResource ::collection ( Product ::latest () -> where ( 'type' , $type ) -> paginate ( 10 ) );
    }

    public function index ()
    {
      return ProductResource ::collection ( Product ::all () );
    }

    public function store ( StoreProductRequest $request )
    {
      $data = $request -> validated ();
      if ( $request -> hasFile ( 'image' ) ) {
        $filename = $request -> file ( 'image' ) -> getClientOriginalName ();
        Storage ::disk ( 'products' ) -> put ( $filename , file_get_contents ( $data[ 'image' ] ) );
        $filepath = 'products/' . $filename;
        $data[ 'image' ] = $filepath;
      }
      Product ::create ( $data );

      return response () -> json ( 'Product Created' );
    }

    public function show ( Product $product )
    {
      return new ProductResource( $product );
    }

    public function update ( UpdateProductRequest $request , Product $product )
    {
      $data = $request -> validated ();
      if ( $request -> file ( 'image' ) ) {
        //delete old pic
        $filename = substr ( $product -> image , 9 );
        $storage = Storage ::disk ( 'products' );
        if ( $storage -> exists ( $filename ) ) {
          $storage -> delete ( $filename );
        }

        //save new pic
        $filename = $request -> file ( 'image' ) -> getClientOriginalName ();
        Storage ::disk ( 'products' ) -> put ( $filename , file_get_contents ( $data[ 'image' ] ) );
        $filepath = 'products/' . $filename;
        $data[ 'image' ] = $filepath;
      }
      $product -> update ( $data );

      return response () -> json ( 'Product updated' );
    }

    public function destroy ( Product $product )
    {
      $filename = substr ( $product -> image , 9 );
      $storage = Storage ::disk ( 'products' );
      if ( $storage -> exists ( $filename ) ) {
        $storage -> delete ( $filename );
      }
      $product -> reviews () -> delete ();
      $product -> delete ();
      $product -> invoice_products () -> delete ();
      return response () -> json ( 'Product deleted' );
    }
  }
