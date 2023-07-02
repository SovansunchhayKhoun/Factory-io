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
        'id' => $this -> id ,
        'project_id' => $this -> project_id ,
        'like_state' => $this -> like_state ,
        'user_id' => $this -> user_id ,
        'like_indicator' => $this -> like_indicator ,
        'user' => User ::where ( 'id' , $this -> user_id ) -> first () ,
        'like_time' => $this -> like_time ,
        'project_resource' => ProjectResource ::collection ( Project ::where ( 'id' , $this -> project_id ) -> get () ) ,
      ];
    }
  }
