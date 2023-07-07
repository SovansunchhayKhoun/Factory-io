<?php

  namespace App\Http\Resources\V1;

  use App\Models\Project;
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
        'image' => $this -> image ,
        'comment_time' => $this -> comment_time ,
        'user_id' => $this -> user_id ,
        'project_id' => $this -> project_id ,
        'project' => $this -> project ,
        'parent_id' => $this -> parent_id ,
        'user_cmt' => $this -> user ,
        'comment_indicator' => $this -> comment_indicator ,
        'comment_seen' => $this -> comment_seen ,
        'replies' => CommentResource ::collection ( $this -> replies ) ,
        'replier_id' => $this -> replier_id ,
        'replier' => $this -> replier ,
      ];
    }
  }
