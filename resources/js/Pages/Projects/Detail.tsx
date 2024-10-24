import { Head, router } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { Project } from "models";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";
import {
  formatStatusOrPriority,
  StatusClass,
  type StatusClassMap,
  StatusText,
} from "@/lib/status_constants";
import { TasksTable } from "@/Components/pages/tasks/tasks-table";
import type { Task } from "models";
import type { PaginatedData, QueryParams } from "@/types";
import { PagePagination } from "@/Components/ui/page-pagination";

type TasksQueryParams = {
  name: string;
  status: string;
} & QueryParams;

type ProjectProps = {
  project: Project;
  tasks: PaginatedData<Task>;
  queryParams:
    | (Partial<TasksQueryParams> & {
        [k: string]: string;
      })
    | null;
};

export default function Details({
  project,
  tasks,
  queryParams = null,
}: ProjectProps) {
  console.log(tasks);
  console.log(queryParams);
  queryParams = queryParams || {};

  function handleSearch(key: string, value: string | null): void {
    if (value) {
      queryParams![key] = value;
      if (queryParams && Object.keys(queryParams).length > 0) {
        router.get(route("projects.show", project.id), queryParams);
      }
    } else {
      delete queryParams![key];
      if (queryParams && Object.keys(queryParams).length > 0) {
        router.get(route("projects.show", project.id), queryParams);
        return;
      }
      router.get(route("projects.show", project.id));
    }
  }

  function onEnterKeySearch(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") {
      e.preventDefault();
      const name = (e.target as HTMLInputElement).name;
      const value = (e.target as HTMLInputElement).value;
      handleSearch(name, value);
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    const key = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setTimeout(() => {
      handleSearch(key, value);
    }, 750);
  }

  function handleSortBy(fieldName: string) {
    if (fieldName === queryParams?.sort_field) {
      if (queryParams?.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams!.sort_direction = "asc";
      }
    } else {
      queryParams!.sort_direction = "asc";
    }
    handleSearch("sort_field", fieldName);
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="relative font-semibold text-gray-800 text-xl leading-tight">
          {" "}
          {`Project: ${project.name}`}{" "}
        </h2>
      }
    >
      {" "}
      <Head title="Tasks" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div>
              <img
                className="h-64 w-full object-cover"
                src={project.image_path}
                alt=""
              />
            </div>

            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                  <div>
                    <Label className="font-bold text-lg">Project Id</Label>
                    <p className="mt-1">{project.id}</p>
                  </div>
                  <div className="mt-4">
                    <Label className="mt-4 font-bold text-lg">
                      Project Name
                    </Label>
                    <p className="mt-1">{project.name}</p>
                  </div>
                  <div className="mt-4 ">
                    <Label className="mt-4 font-bold text-lg">
                      Project Status
                    </Label>
                    <div className="mt-1 block">
                      <div
                        className={cn(
                          "inline-block rounded px-2 py-3 text-gray-100",
                          formatStatusOrPriority(
                            StatusClass,
                            project.status as keyof StatusClassMap,
                          ),
                        )}
                      >
                        {formatStatusOrPriority(
                          StatusText,
                          project.status as keyof StatusClassMap,
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label className="mt-4 font-bold text-lg">Created By</Label>
                    <p className="mt-1">{project.created_by.name}</p>
                  </div>
                </div>
                <div>
                  <div className="mt-4">
                    <Label className="font-bold text-lg">Due Date</Label>
                    <p className="mt-1">{project.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <Label className="font-bold text-lg">Created at</Label>
                    <p className="mt-1">{project.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <Label className="font-bold text-lg">Updated by</Label>
                    <p className="mt-1">{project.updated_by.name}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Label className="font-bold text-lg">Project Description</Label>
                <p className="mt-1">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TasksTable
                displayProject={false}
                handleSearch={handleSearch}
                handleSortBy={handleSortBy}
                onChange={onChange}
                onEnterKeySearch={onEnterKeySearch}
                tasks={tasks}
                queryParams={queryParams}
              />
              <div className="pt-6 pb-12">
                <PagePagination meta={tasks.meta} queryParams={queryParams} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
