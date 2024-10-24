import type React from "react";
import { useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/Components/ui/button";
import {
  formatStatusOrPriority,
  PriorityClass,
  PriorityText,
  StatusClass,
  type StatusClassMap,
  StatusText,
} from "@/lib/status_constants";
import { cn } from "@/lib/utils";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortableTableHead } from "@/Components/ui/sortable-table-head";
import { Link } from "@inertiajs/react";
import type { PaginatedData, QueryParams } from "@/types";
import type { Task } from "models";

type TasksQueryParams = {
  name: string;
  status: string;
} & QueryParams;

type TasksTableProps = {
  tasks: PaginatedData<Task>;
  queryParams:
    | (Partial<TasksQueryParams> & {
        [k: string]: string;
      })
    | null;
  displayProject?: boolean;
  handleSortBy: (fieldName: string) => void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onEnterKeySearch(e: React.KeyboardEvent<HTMLInputElement>): void;
  handleSearch(key: string, value: string | null): void;
};

export const TasksTable: React.FC<TasksTableProps> = ({
  tasks,
  queryParams = null,
  displayProject = true,
  handleSortBy,
  onChange,
  onEnterKeySearch,
  handleSearch,
}) => {
  queryParams = queryParams || {};
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (queryParams?.name && searchRef.current) {
      searchRef.current.focus();
    }
  }, [queryParams.name]);
  // TODO: Make header sticky for better UX on large set of data.
  // https://codesandbox.io/p/sandbox/sticky-header-table-with-react-3j5zy?file=/src/Table.js

  return (
    <div className="relative overflow-auto p-6 text-gray-900 dark:text-gray-100">
      <Table>
        <TableCaption>Tasks</TableCaption>
        <TableHeader className="sticky top-0 z-10">
          <TableRow>
            <TableHead className="px-3 py-2">Id</TableHead>
            {displayProject && (
              <TableHead className="px-3 py-2">Project</TableHead>
            )}
            <SortableTableHead
              handleSortBy={handleSortBy}
              fieldName="name"
              sortField={queryParams.sort_field ?? null}
              sortDirection={queryParams.sort_direction ?? null}
            >
              Name
            </SortableTableHead>
            <TableHead className="px-3 py-2">Status</TableHead>
            <TableHead className="px-3 py-2">Priority</TableHead>
            <SortableTableHead
              handleSortBy={handleSortBy}
              fieldName="create_at"
              sortField={queryParams.sort_field ?? null}
              sortDirection={queryParams.sort_direction ?? null}
            >
              Created At
            </SortableTableHead>
            <SortableTableHead
              handleSortBy={handleSortBy}
              fieldName="due_date"
              sortField={queryParams.sort_field ?? null}
              sortDirection={queryParams.sort_direction ?? null}
            >
              Due Date
            </SortableTableHead>
            <SortableTableHead
              handleSortBy={handleSortBy}
              fieldName="created_by"
              sortField={queryParams.sort_field ?? null}
              sortDirection={queryParams.sort_direction ?? null}
            >
              Created By
            </SortableTableHead>
            <TableHead className="px-3 py-2 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableHeader>
          <TableRow>
            <TableHead className="px-3 py-2" />
            {displayProject && <TableHead className="px-3 py-2" />}
            <TableHead className="px-3 py-2">
              <Input
                ref={searchRef}
                id="name"
                name="name"
                defaultValue={queryParams.name ?? ""}
                onChange={onChange}
                onKeyDown={onEnterKeySearch}
              />
            </TableHead>
            <TableHead className="px-3 py-2 ">
              <Select
                onValueChange={(value) => {
                  if (value === "all") {
                    handleSearch("status", null);
                    return;
                  }
                  handleSearch("status", value);
                }}
                defaultValue={queryParams.status ?? ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent defaultValue={""}>
                  {queryParams?.status && (
                    <SelectItem value="all">All</SelectItem>
                  )}
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </TableHead>
            <TableHead className="px-3 py-2">
              <Select
                onValueChange={(value) => {
                  if (value === "all") {
                    handleSearch("priority", null);
                    return;
                  }
                  handleSearch("priority", value);
                }}
                defaultValue={queryParams.prioroty ?? ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent defaultValue={""}>
                  {queryParams?.status && (
                    <SelectItem value="all">All</SelectItem>
                  )}
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </TableHead>

            <TableHead className="px-3 py-2" />
            <TableHead className="px-3 py-2" />
            <TableHead className="px-3 py-2" />
            <TableHead className="px-3 py-2 text-right" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.data.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.id}</TableCell>
              {displayProject && (
                <TableCell className="px-3 py-2">{task.project.name}</TableCell>
              )}
              <TableCell className="px-3 py-2">{task?.name ?? ""}</TableCell>
              <TableCell className="px-3 py-2">
                <span
                  className={cn(
                    "rounded px-2 py-3 text-gray-100",
                    formatStatusOrPriority(
                      StatusClass,
                      task.status as keyof StatusClassMap,
                    ),
                  )}
                >
                  {formatStatusOrPriority(
                    StatusText,
                    task.status as keyof StatusClassMap,
                  )}
                </span>
              </TableCell>
              <TableCell className="px-3 py-2">
                <span
                  className={cn(
                    "rounded px-2 py-3 text-gray-100",
                    formatStatusOrPriority(
                      PriorityClass,
                      task.priority as keyof StatusClassMap,
                    ),
                  )}
                >
                  {formatStatusOrPriority(
                    PriorityText,
                    task.priority as keyof StatusClassMap,
                  )}
                </span>
              </TableCell>
              <TableCell className="px-3 py-2">{task.created_at}</TableCell>
              <TableCell className="px-3 py-2">{task.due_date}</TableCell>
              <TableCell className="px-3 py-2">
                {task.created_by.name}
              </TableCell>
              <TableCell className="flex items-center gap-2 px-3 py-2 text-right">
                <Button asChild variant="secondary">
                  <Link
                    href={route("tasks.edit", task.id)}
                    rel="noopener noreferrer"
                  >
                    Edit
                  </Link>
                </Button>
                <Button asChild variant="destructive">
                  <Link
                    href={route("tasks.edit", task.id)}
                    rel="noopener noreferrer"
                  >
                    Delete
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
