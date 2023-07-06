<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\BackProjectRequest;
use App\Http\Requests\FundingRequest;
use App\Http\Resources\V1\BackProjectResource;
use App\Models\BackProject;
use App\Models\Funding;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BackProjectController extends Controller
{
    public function index()
    {
      return BackProjectResource::collection(BackProject::all());
    }
  public function store(BackProjectRequest $request)
  {
    $data = $request->validated();
    if($request->hasFile('image')){
      $filename = $request->file('image')->getClientOriginalName();
      Storage::disk('backProjects')->put($filename,file_get_contents($data['image']));
      $filepath = 'backProjects/' . $filename;
      $data['image'] = $filepath;
    }
    BackProject::create($data);
    return response() -> json('Back Project Created');
  }
}
