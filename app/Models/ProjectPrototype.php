<?php

  namespace App\Models;

  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;

  class ProjectPrototype extends Model
  {
    use HasFactory;
    protected $fillable = [
      'image',
      'description',
      'price',
      'project_id',
    ];
    public function project ()
    {
      return $this -> belongsTo ( Project::class );
    }
  }
