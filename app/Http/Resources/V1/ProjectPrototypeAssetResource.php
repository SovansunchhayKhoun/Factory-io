<?php

  namespace App\Http\Resources\V1;

  use Illuminate\Http\Request;
  use Illuminate\Http\Resources\Json\JsonResource;

  class ProjectPrototypeAssetResource extends JsonResource
  {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray ( Request $request ) : array
    {
      return [
        'id' => $this -> id ,
        'project_prototype_id' => $this -> project_prototype_id ,
        'image' => $this -> image ,
        'project_prototype' => $this -> project_prototype
      ];
    }
  }
