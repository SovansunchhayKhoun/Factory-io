<?php

  namespace App\Http\Resources\V1;

  use Illuminate\Http\Request;
  use Illuminate\Http\Resources\Json\JsonResource;

  class CommentResource extends JsonResource
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
        'body' => $this -> body ,
        'comment_time' => $this -> comment_time ,
        'user_id' => $this -> user_id ,
        'project_id' => $this -> project_id ,
        'parent_id' => $this -> parent_id ,
        'replies' => CommentResource ::collection ( $this -> replies ) ,
      ];
    }
  }
