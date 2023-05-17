<?php

    namespace App\Http\Controllers\Api\V1;

    use App\Http\Controllers\Controller;
    use App\Http\Requests\StoreProductRequest;
    use App\Http\Requests\UpdateProductRequest;
    use App\Http\Resources\V1\ProductResource;
    use App\Http\Resources\V1\SkillResource;
    use App\Models\Product;
    use Illuminate\Http\Request;
    class ProductController extends Controller
    {
        public function changeImage(UpdateProductRequest $request)
        {
          $data = $request->validated();
          dd($data);
        }
        public function index ()
        {
            return ProductResource ::collection ( Product ::all () );
        }

        public function store ( StoreProductRequest $request)
        {
          $data = $request->validated();
            if($request->hasFile('image')){
              $filename = $request->file('image')->getClientOriginalName();
              $filepath = $request->file('image')->storeAs('products',$filename);
              $data['image'] = $filepath;
            }
            Product ::create ( $data);
            return response () -> json ( 'Product Created' );
        }

        public function show ( Product $product )
        {
            return new ProductResource( $product );
        }

        public function update ( UpdateProductRequest $request , Product $product )
        {
            $data = $request->validated();
            dd($data);
          if($request->hasFile('image')){
            $filename = $request->file('image')->getClientOriginalName();
            $filepath = $request->file('image')->storeAs('products',$filename);
            $data['image'] = $filepath;
          }
            $product -> update ( $data );
            return response () -> json ( 'Product updated' );
        }

        public function destroy ( Product $product )
        {
            $product -> delete ();
            return response () -> json ( 'Product deleted' );
        }
    }
