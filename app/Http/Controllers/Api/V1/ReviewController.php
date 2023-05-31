<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewRequest;
use App\Http\Resources\V1\ReviewResource;
use App\Models\Review;
use Illuminate\Http\Request;
use App\Http\Resources\V1\SkillResource;

class ReviewController extends Controller
{
  public function store(ReviewRequest $request)
  {
    $data = $request->validated();
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
