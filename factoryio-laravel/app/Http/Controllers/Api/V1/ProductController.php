<?php

    namespace App\Http\Controllers\Api\V1;

    use App\Http\Controllers\Controller;
    use App\Http\Requests\StoreProductRequest;
    use App\Http\Resources\V1\ProductResource;
    use App\Http\Resources\V1\SkillResource;
    use App\Models\Product;

    class ProductController extends Controller
    {
        public function index ()
        {
            return ProductResource ::collection ( Product ::all () );
        }

        public function store ( StoreProductRequest $request )
        {
            Product ::create ( $request -> validated () );
            return response () -> json ( 'Product Created' );
        }

        public function show ( Product $product )
        {
            return new ProductResource( $product );
        }

        public function update ( StoreProductRequest $request , Product $product )
        {
            $product -> update ( $request -> validated () );
            return response () -> json ( 'Product updated' );
        }

        public function destroy ( Product $product )
        {
            $product -> delete ();
            return response () -> json ( 'Product deleted' );
        }
    }
