<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
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
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
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
        $tasks = $query->where('project_id', $project->id)->orderBy($sortField, $sortDirection)->paginate(10);
        return Inertia::render('Projects/Detail', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
