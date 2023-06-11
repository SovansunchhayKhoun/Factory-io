<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
      'name',
      'description',
      'rating',
      'funder_count',
      'target_fund',
      'project_deadline',
      'image',
      'file',
      'category'
    ];

    public function users() {
      return $this->belongsToMany (User::class, 'project_users', 'project_id', 'user_id');
    }
}
