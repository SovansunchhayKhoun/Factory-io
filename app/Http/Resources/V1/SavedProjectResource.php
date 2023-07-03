<?php

  namespace App\Http\Resources\V1;

  use App\Models\Project;
  use Illuminate\Http\Request;
  use Illuminate\Http\Resources\Json\JsonResource;

  class SavedProjectResource extends JsonResource
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
        'user_id' => $this -> user_id ,
        'project_id' => $this -> project_id ,
        'save_state' => $this -> save_state ,
        'project' => $this -> project ,
        'project_resource' => ProjectResource::collection (Project::where('id', $this->project_id)->get()),
        'user' => $this -> user
      ];
    }
  }
