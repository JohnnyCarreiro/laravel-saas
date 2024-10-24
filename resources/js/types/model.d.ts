declare module "models" {
  interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  }

  interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
    due_date: string;
    image_path: string;
    created_by: User;
    updated_by: User;
    created_at: number;
    updated_at: number;
  }

  interface Task {
    id: number;
    name: string;
    description: string;
    image_path: string;
    status: string;
    priority: string;
    due_date: string;
    created_by: User;
    assigned_user: User;
    project: Project;
    updated_by: number;
    created_at: number;
    updated_at: number;
  }
}
