<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\FundingRequest;
use App\Http\Resources\V1\FundingResource;
use App\Models\Funding;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FundingController extends Controller
{
    public function index()
    {
      return FundingResource::collection(Funding::all());
    }
    public function store(FundingRequest $request)
    {
      $data = $request->validated();
      if($request->hasFile('image')){
        $filename = $request->file('image')->getClientOriginalName();
        Storage::disk('fundings')->put($filename,file_get_contents($data['image']));
        $filepath = 'fundings/' . $filename;
        $data['image'] = $filepath;
      }
      Funding::create($data);
      return response() -> json('Funding Created');
    }
}
