<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewRequest;
use App\Http\Resources\V1\ReviewResource;
use App\Models\Review;
use Illuminate\Support\Facades\Storage;

class ReviewController extends Controller
{
    public function store(ReviewRequest $request)
    {
        $data = $request->validated();
        if($request->hasFile('image')){
          $filename = $request -> file ( 'image' ) -> getClientOriginalName ();
          Storage ::disk ( 'reviews' ) -> put ( $filename , file_get_contents ( $data[ 'image' ] ) );
          $filepath = 'reviews/' . $filename;
          $data[ 'image' ] = $filepath;
        }
        Review::create($data);

        return response()->json('Successfully Created');
    }

    public function index()
    {
        return ReviewResource::collection(Review::all());
    }

    public function show(Review $review)
    {
        return new ReviewResource($review);
    }

    public function destroy(Review $review)
    {
        $review->delete();
        return response()->json('Deleted Successfully');
    }
}
