<?php

  namespace App\Http\Resources\V1;

  use Illuminate\Http\Request;
  use Illuminate\Http\Resources\Json\JsonResource;

  class ProjectPrototypeResource extends JsonResource
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
        'proto_name' => $this -> proto_name ,
        'project_id' => $this -> project_id ,
//        'image' => $this -> image ,
        'description' => $this -> description ,
        'price' => $this -> price ,
        'project_prototype_assets' => $this -> project_prototype_assets ,
      ];
    }
  }
