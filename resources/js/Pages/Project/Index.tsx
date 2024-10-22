import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
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
import { PagePagination } from "@/Components/ui/page_pagination";
import type { PaginationData } from "@/types";
import {
  formatStatusOrPriority,
  StatusClass,
  type StatusClassMap,
  StatusText,
} from "@/lib/status_constants";
import { cn } from "@/lib/utils";

type ProjectsIndex = {
  projects: {
    data: Project[];
    meta: PaginationData;
  };
};

export default function Index({ projects }: ProjectsIndex) {
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
              {/* <pre>{JSON.stringify(projects.meta, null, 2)}</pre> */}
              <Table>
                <TableCaption>Projects</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-3 py-2">Id</TableHead>
                    <TableHead className="px-3 py-2">Image</TableHead>
                    <TableHead className="px-3 py-2">Name</TableHead>
                    <TableHead className="px-3 py-2">Status</TableHead>
                    <TableHead className="px-3 py-2">Created at</TableHead>
                    <TableHead className="px-3 py-2">Due Date</TableHead>
                    <TableHead className="px-3 py-2">Created By</TableHead>
                    <TableHead className="px-3 py-2 text-right">
                      Action
                    </TableHead>
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
                            href={route("project.edit", project.id)}
                            rel="noopener noreferrer"
                          >
                            Edit
                          </Link>
                        </Button>
                        <Button asChild variant="destructive">
                          <Link
                            href={route("project.edit", project.id)}
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
              <PagePagination meta={projects.meta} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
