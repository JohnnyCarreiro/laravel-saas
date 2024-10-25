import { Head, router } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { Project } from "models";
import type { Task } from "models";
import type { PaginatedData, QueryParams } from "@/types";
import { Wrapper } from "@/Components/pages/wrapper";
import { CreateProjectForm } from "@/Components/pages/projects/create-project-form";
import { useState } from "react";

type TasksQueryParams = {
  name: string;
  status: string;
} & QueryParams;

type ProjectProps = {
  queryParams:
    | (Partial<TasksQueryParams> & {
        [k: string]: string;
      })
    | null;
};

export default function CreatePage() {
  const [imgURL, setImgURL] = useState<string | null>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImgURL(URL.createObjectURL(file));
    }
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="relative font-semibold text-gray-800 text-xl leading-tight">
          Create new Project
        </h2>
      }
    >
      <Head title="Cerate Project" />

      <Wrapper>
        {imgURL && (
          <div>
            <img className="h-64 w-full object-cover" src={imgURL} alt="" />
          </div>
        )}
        <div className="p-6 text-gray-900 dark:text-gray-100">
          <div className="my-2">
            <p>Fields with * are required</p>
          </div>
          <CreateProjectForm onFileChange={onFileChange} />
        </div>
      </Wrapper>

      <Wrapper className="py-12">
        <div className="p-6 text-gray-900 dark:text-gray-100">
          Some additional information
        </div>
      </Wrapper>
    </AuthenticatedLayout>
  );
}
