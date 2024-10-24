import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import type { Task } from "models";
import type { PageProps, PaginatedData, QueryParams } from "@/types";
import { TasksTable } from "@/Components/pages/tasks/tasks-table";
import { PagePagination } from "@/Components/ui/page-pagination";

type TasksQueryParams = {
  name: string;
  status: string;
} & QueryParams;

type TasksProps = {
  tasks: PaginatedData<Task>;
  queryParams:
    | (Partial<TasksQueryParams> & {
        [k: string]: string;
      })
    | null;
} & PageProps;

export default function Index({ tasks, queryParams = null }: TasksProps) {
  queryParams = queryParams || {};

  function handleSearch(key: string, value: string | null): void {
    if (value) {
      queryParams![key] = value;
      if (queryParams && Object.keys(queryParams).length > 0) {
        router.get(route("tasks.index"), queryParams);
      }
    } else {
      delete queryParams![key];
      if (queryParams && Object.keys(queryParams).length > 0) {
        router.get(route("tasks.index"), queryParams);
        return;
      }
      router.get(route("tasks.index"));
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
          Tasks
        </h2>
      }
    >
      <Head title="Tasks" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <TasksTable
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
    </AuthenticatedLayout>
  );
}
