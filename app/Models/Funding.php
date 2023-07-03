<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Funding extends Model
{
    use HasFactory;
    protected $fillable = [
      'funder_id', 'comment', 'amount', 'image', 'project_id'
    ];

    public function project()
    {
      return $this->belongsTo(Project::class);
    }
}
