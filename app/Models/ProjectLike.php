<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectLike extends Model
{
    use HasFactory;
    protected $fillable = [
      'project_id', 'user_id', 'like_state', 'like_indicator', 'like_time'
    ];

    public function users ()
    {
      return $this->belongsTo (User::class);
    }

    public function projects ()
    {
      return $this->belongsTo (Project::class);
    }
}
