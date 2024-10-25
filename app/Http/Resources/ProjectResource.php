<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProjectResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d H:i:s'),
            'status' => $this->status,
            'image_path' => $this->getImageUrl($this->image_path),
            'created_by' => new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d H:i:s'),
        ];
    }

    /**
     *  Get image URL
     *  @param string|null $imagePath
     *  @return string|null
     */
    private function getImageUrl(?string $imagePath): ?string
    {
        if ($imagePath && str_starts_with($imagePath, 'http')) {
            return $imagePath;
        }
        return $imagePath ? Storage::url($imagePath) : null;
    }
}
