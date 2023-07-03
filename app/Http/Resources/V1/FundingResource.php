<?php

namespace App\Http\Resources\V1;

use App\Models\Product;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FundingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
          'id' => $this->id,
          'comment' => $this->comment,
          'image' => $this->image,
          'project_id' => $this->project_id,
          'funder_id' => $this->funder_id,
          'funder' => User::where('id', $this->funder_id)->get(),
          'project' => ProjectResource::collection(Project::where('id', $this->project_id)->get()),
          'created_at' => $this->created_at,
        ];
    }
}
