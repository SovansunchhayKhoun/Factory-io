<?php

  namespace App\Models;

  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;

  class ProjectPrototype extends Model
  {
    use HasFactory;

    protected $fillable = [
      'proto_name' ,
      'image' ,
      'description' ,
      'price' ,
      'project_id' ,
    ];

    public function project ()
    {
      return $this -> belongsTo ( Project::class , 'project_id' , 'id' );
    }

    public function project_prototype_assets ()
    {
      return $this -> hasMany ( ProjectPrototypeAsset::class , 'project_prototype_id' , 'id' );
    }

  }
