<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\DonationRequest;
use App\Http\Resources\V1\DonationResource;
use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DonationController extends Controller
{
  public function index()
  {
    return DonationResource::collection(Donation::all());
  }
  public function store(DonationRequest $request)
  {
    $data = $request->validated();
    if ($request->hasFile('image')){
      $filename = $request -> file ( 'image' ) -> getClientOriginalName ();
      Storage ::disk ( 'donations' ) -> put ( $filename , file_get_contents ( $data[ 'image' ] ) );
      $filepath = 'donations/' . $filename;
      $data[ 'image' ] = $filepath;
    }
    Donation::create($data);
    return response () -> json ( 'Donation Created' );
  }
}
