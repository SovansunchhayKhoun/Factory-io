<?php

  namespace App\Http\Resources\V1;

  use App\Models\User;
  use Illuminate\Http\Request;
  use Illuminate\Http\Resources\Json\JsonResource;

  class ProjectResource extends JsonResource
  {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray ( Request $request ) : array
    {
      return [
        'name' => $this -> name ,
        'description' => $this -> description ,
        'project_deadline' => $this -> project_deadline,
        'image' => $this->image,
        'file' => $this->file,
        'category' => $this->category,
        'liked_count' => $this -> liked_count ,
        'funder_count' => $this -> funder_count ,
        'target_fund' => $this -> target_fund ,
        'comment_count' => $this->comment_count,
        'user' => User::where('id', $this->user_id)->first()
      ];
    }
  }
