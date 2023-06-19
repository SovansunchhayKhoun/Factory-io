<?php

  namespace App\Models;

  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  use Illuminate\Database\Eloquent\Relations\HasMany;

  class Project extends Model
  {
    use HasFactory;

    protected $fillable = [
      'user_id' ,
      'image' ,
      'file' ,
      'name' ,
      'project_deadline' ,
      'category' ,
      'like_count' ,
      'comment_count' ,
      'saved_count' ,
      'funder_count' ,
      'target_fund' ,
      'proposal' ,
      'description' ,
    ];

    public function users ()
    {
      return $this -> belongsTo ( User::class , 'project_id' , 'id' );
    }

    public function projectPrototypes () : HasMany
    {
      return $this -> hasMany ( ProjectPrototype::class , 'project_id' , 'id' );
    }

    public function projectAssets () : HasMany
    {
      return $this -> hasMany ( ProjectAsset::class , 'project_id' , 'id' );
    }
//    public function users() {
//      return $this->belongsToMany (User::class, 'project_users', 'project_id', 'user_id');
//    }
  }
