interface ShellResponse {
  type: "shell" | "code";
  data: any;
}

interface CodeFile {
  filename: string;
  content: string;
}

interface NavItem {
  name: string;
  href: string;
}

interface Project {
  $id: string;
  name: string;
  filename: string;
  owner: string;
  language: string;
}

interface BookPage {
  order: number;
  title: string;
  link: string;
}

interface TaskResult {
  $id: string;
  input: string = "";
  output: string = "";
}

interface Task {
  $id: string;
  title: string;
  info: string;
  creator: User;
  language: string;
  tasksResults: TaskResult[];
  public: boolean;
  tags: Tag[];
}

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "expert";
}

interface Assignment {
  $id: string;
  $createdAt: string;
  content: string;
  tasks: Task;
  owner: User;
  done: boolean;
}

interface Tag {
  $id: string;
  name: string;
}
