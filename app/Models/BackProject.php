<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BackProject extends Model
{
    use HasFactory;

    protected $fillable = [
      'funder_id','project_id','amount','comment','image','prototype_id','qty'
    ];

    public function project()
    {
      return $this->belongsTo(Project::class);
    }
}
