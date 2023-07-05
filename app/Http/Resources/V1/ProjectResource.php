<?php

  namespace App\Http\Resources\V1;

  use App\Models\ProjectAsset;
  use App\Models\ProjectImage;
  use App\Models\ProjectLike;
  use App\Models\ProjectPrototype;
  use App\Models\SavedProject;
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
        'id' => $this -> id ,
        'name' => $this -> name ,
        'project_deadline' => $this -> project_deadline ,
        'image' => $this -> image ,
        'file' => $this -> file ,
        'category' => $this -> category ,
        'funder_count' => $this -> funder_count ,
        'target_fund' => $this -> target_fund ,
        'comment_count' => $this -> comment_count ,
        'proposal' => $this -> proposal ,
        'description' => $this -> description ,
        'created_at' => $this -> created_at ,
        'user_id' => $this -> user_id ,
        'user' => $this -> users ,
        'like_count' => ProjectLike ::where ( 'project_id' , $this -> id ) -> sum ( 'like_state' ) ,
        'save_count' => SavedProject ::where ( 'project_id' , $this -> id ) -> sum ( 'save_state' ) ,
        'projectPrototypes' => ProjectPrototypeResource ::collection ( $this -> project_prototypes ) ,
        'projectAssets' => $this -> project_assets ,
        'projectImages' => $this -> project_images ,
        'projectLikes' => $this -> project_likes ,
        'like_state' => ProjectLike ::select ( 'id' , 'like_state' , 'user_id' , 'project_id' ) -> where ( 'project_id' , $this -> id ) -> get () ,
        'save_state' => SavedProject ::select ( 'id' , 'save_state' , 'user_id' , 'project_id' ) -> where ( 'project_id' , $this -> id ) -> get () ,
        'projectSaves' => $this -> project_saves ,
        'comments' => CommentResource ::collection ( $this -> comments )
//        'user' => User ::where ( 'id' , $this -> user_id ) -> first () ,
//        'projectAssets' => ProjectAsset ::where ( 'project_id' , $this -> id ) -> get () ,
//        'projectImages' => ProjectImage ::where ( 'project_id' , $this -> id ) -> get () ,
//        'projectPrototypes' => ProjectPrototype ::where ( 'project_id' , $this -> id ) -> get () ,
//        'projectLikes' => ProjectLike ::where ( 'project_id' , $this -> id ) -> get () ,
//        'like_state' => ProjectLike:: select('project_id','like_state', 'user_id')-> where([
//          ['project_id', '=', $this->id]
//        ])->first()
      ];
    }
  }
