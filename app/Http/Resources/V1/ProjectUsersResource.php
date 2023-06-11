<?php

  namespace App\Http\Resources\V1;

  use App\Models\Project;
  use App\Models\User;
  use Illuminate\Http\Request;
  use Illuminate\Http\Resources\Json\JsonResource;

  class ProjectUsersResource extends JsonResource
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
        'user_id' => $this -> user_id ,
        'project' => Project ::where ( 'id' , $this -> project_id ) -> get () ,
        'user' => User ::where ( 'id' , $this -> user_id ) -> get () ,
      ];
    }
  }
