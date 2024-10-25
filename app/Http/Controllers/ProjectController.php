<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource. Also View
     * @return Response
     */
    public function index(): Response
    {
        $query = Project::query();
        $sortField = request('sort_field', 'created_at');
        $sortDicretion = request('sort_direction', 'desc');
        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        $projects = $query->orderBy($sortField, $sortDicretion)->paginate(10);
        return Inertia::render('Projects/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success') ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource. Also View
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     * @return RedirectResponse
     */
    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $data = $request->validated();
        // /** @var $image \Illuminate\Http\UploadedFile */
        // $image = $data['image'] ?? null;
        $image = request()->file('image') ?? $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image && $image instanceof \Illuminate\Http\UploadedFile) {
            $data['image_path'] = $image->store('project/' . Str::random(), 'public');
        }
        Project::create($data);
        return to_route('projects.index')
            ->with('success', "Project: {$data['name']} created successfully");
    }

    /**
     * Display the specified resource. Also View
     * @return Response
     */
    public function show(Project $project): Response
    {
        $query = $project->tasks();
        $sortField = request('sort_fiels', 'created_at');
        $sortDirection = request('sort_diretction', 'desc');
        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        if (request('priority')) {
            $query->where('priority', request('priority'));
        }
        // TODO: Add Success and Failure message to this view
        $tasks = $query->where('project_id', $project->id)->orderBy($sortField, $sortDirection)->paginate(10);
        return Inertia::render('Projects/Detail', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     * @return Response
     */
    public function edit(Project $project): void //Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * @return RedirectResponse
     */
    public function update(UpdateProjectRequest $request, Project $project): void // RedirectResponse
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @return RedirectResponse
     */
    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();
        return to_route('projects.index')
            ->with('success', "Project: {$project->name} deleted successfully");
    }
}
