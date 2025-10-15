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
