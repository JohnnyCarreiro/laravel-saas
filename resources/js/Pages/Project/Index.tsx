import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import type { Project } from "models";
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
import { PagePagination } from "@/Components/ui/page-pagination";
import type { PageProps, PaginatedData, QueryParams } from "@/types";
import {
  formatStatusOrPriority,
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
import { useEffect, useRef } from "react";
import { SortableTableHead } from "@/Components/ui/sortable-table-head";

type ProjectsQueryParams = {
  name: string;
  status: string;
} & QueryParams;

type ProjectsProps = {
  projects: PaginatedData<Project>;
  queryParams:
    | (Partial<ProjectsQueryParams> & {
        [k: string]: string;
      })
    | null;
} & PageProps;

export default function Index({ projects, queryParams = null }: ProjectsProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  queryParams = queryParams || {};

  useEffect(() => {
    if (queryParams?.name && searchRef.current) {
      searchRef.current.focus();
    }
  }, [queryParams.name]);

  function handleSearch(key: string, value: string | null): void {
    if (value) {
      queryParams![key] = value;
      if (queryParams && Object.keys(queryParams).length > 0) {
        router.get(route("projects.index"), queryParams);
      }
    } else {
      delete queryParams![key];
      if (queryParams && Object.keys(queryParams).length > 0) {
        router.get(route("projects.index"), queryParams);
        return;
      }
      router.get(route("projects.index"));
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
        <h2 className="font-semibold text-gray-800 text-xl leading-tight">
          Projects
        </h2>
      }
    >
      <Head title="Projects" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <Table>
                <TableCaption>Projects</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-3 py-2">Id</TableHead>
                    <TableHead className="px-3 py-2">Image</TableHead>
                    <SortableTableHead
                      handleSortBy={handleSortBy}
                      fieldName="name"
                      sortField={queryParams.sort_field ?? null}
                      sortDirection={queryParams.sort_direction ?? null}
                    >
                      Name
                    </SortableTableHead>
                    <TableHead className="px-3 py-2">Status</TableHead>
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
                    <TableHead className="px-3 py-2 text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-3 py-2" />
                    <TableHead className="px-3 py-2" />
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
                    <TableHead className="px-3 py-2">
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
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent defaultValue={""}>
                          {queryParams?.status && (
                            <SelectItem value="all">All</SelectItem>
                          )}
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="in_progress">
                            In Progress
                          </SelectItem>
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
                  {projects.data.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">
                        {project.id}
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        <img className="w-16" src={project.image_path} alt="" />
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        {project.name}
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        <span
                          className={cn(
                            "rounded px-2 py-3 text-gray-100",
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
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        {project.created_at}
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        {project.due_date}
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        {project.created_by.name}
                      </TableCell>
                      <TableCell className="flex items-center gap-2 px-3 py-2 text-right">
                        <Button asChild variant="secondary">
                          <Link
                            href={route("projects.edit", project.id)}
                            rel="noopener noreferrer"
                          >
                            Edit
                          </Link>
                        </Button>
                        <Button asChild variant="destructive">
                          <Link
                            href={route("projects.edit", project.id)}
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
              <PagePagination meta={projects.meta} queryParams={queryParams} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
