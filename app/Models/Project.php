<?php

  namespace App\Models;

  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;

  class Project extends Model
  {
    use HasFactory;

    protected $fillable = [
      'user_id' ,
      'image' ,
      'file' ,
      'name' ,
      'description' ,
      'project_deadline' ,
      'category' ,
      'like_count' ,
      'comment_count' ,
      'saved_count' ,
      'funder_count' ,
      'target_fund' ,
    ];

    public function users ()
    {
      return $this -> belongsTo ( User::class , 'project_id' , 'id' );
    }

//    public function users() {
//      return $this->belongsToMany (User::class, 'project_users', 'project_id', 'user_id');
//    }
  }
