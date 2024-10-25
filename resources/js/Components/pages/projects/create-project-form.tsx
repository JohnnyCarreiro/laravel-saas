import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormDatePicker } from "@/Components/ui/form-date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, router } from "@inertiajs/react";
import { Textarea } from "@/components/ui/textarea";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  image: z
    .instanceof(FileList)
    .optional()
    .refine(
      (fileList) => {
        if (fileList && fileList.length > 1) return false;
        return true;
      },
      { message: "Only one file allowed" },
    )
    .refine(
      (fileList) => {
        if (fileList) {
          const file = fileList[0];
          if (file?.size >= MAX_FILE_SIZE) return false;
        }
        return true;
      },
      { message: "Max image size is 5MB" },
    )
    .refine(
      (fileList) => {
        if (fileList) {
          const file = fileList[0];
          if (!file) return true;
          if (!ACCEPTED_IMAGE_TYPES.includes(file?.type)) return false;
        }
        return true;
      },
      {
        message: "Invalid image format.",
      },
    ),
  name: z
    .string()
    .min(3, { message: "Provide a name with more than 3 characters" }),
  description: z.string().min(3, {
    message: "Provider a better description, at least 3 characters long",
  }),
  due_date: z.date({ message: "Provide a due date" }),
  status: z.enum(["pending", "in_progress", "completed"], {
    message: "Provide a status",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

type CreateProjectFormProps = {
  onFileChange(e: React.ChangeEvent<HTMLInputElement>): void;
};

export const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  onFileChange,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: "pending",
    },
  });
  const fileRef = form.register("image");

  useEffect(() => {
    form.setFocus("name");
  }, [form.setFocus]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.post(route("projects.store"), {
      name: data.name,
      image: data?.image ? data.image[0] : null,
      description: data.description,
      due_date: data.due_date,
      status: data.status,
    });
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...fileRef}
                  placeholder="Upload a project image"
                  onChange={(event) => {
                    onFileChange(event);
                  }}
                  className="hover:cursor-pointer file:text-muted-foreground file:placeholder:text-muted-foreground hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name*</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about the project"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="due_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date*</FormLabel>
                <FormDatePicker<FormValues> field={field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Status*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent defaultValue={field.value}>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="ml-auto w-full flex gap-2 justify-end self-end">
          <Button asChild variant="secondary">
            <Link href={route("projects.index")}>Cancel</Link>
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
