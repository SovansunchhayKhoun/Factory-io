<?php

  namespace App\Models;

  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;

  class ProjectPrototypeAsset extends Model
  {
    use HasFactory;

    protected $fillable = [
      'project_prototype_id' , 'image'
    ];

    public function project_prototype ()
    {
      return $this -> belongsTo ( ProjectPrototype::class , 'project_prototype_id' , 'id' );
    }
  }
