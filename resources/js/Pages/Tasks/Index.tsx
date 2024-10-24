import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import type { Task } from "models";
import type { PageProps, PaginatedData, QueryParams } from "@/types";
import { TasksTable } from "@/Components/pages/tasks/tasks-table";

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
            <TasksTable tasks={tasks} queryParams={queryParams} />{" "}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
