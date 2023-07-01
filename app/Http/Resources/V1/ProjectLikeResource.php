<?php

  namespace App\Http\Resources\V1;

  use App\Models\Project;
  use App\Models\User;
  use Illuminate\Http\Request;
  use Illuminate\Http\Resources\Json\JsonResource;

  class ProjectLikeResource extends JsonResource
  {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray ( Request $request ) : array
    {
      return [
        'project_id' => $this -> project_id ,
        'like_state' => $this -> like_state ,
        'user_id' => $this -> user_id ,
        'user' => User ::where ( 'id' , $this -> user_id ) -> first () ,
        'project' => Project ::where ( 'id' , $this -> project_id ) -> first ()
      ];
    }
  }
