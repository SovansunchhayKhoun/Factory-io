<?php

  namespace App\Http\Resources\V1;

  use Illuminate\Http\Request;
  use Illuminate\Http\Resources\Json\JsonResource;

  class ProjectImageResource extends JsonResource
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
        'project_id' => $this -> project_id ,
        'image' => $this -> image
      ];
    }
  }
