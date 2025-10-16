"use client";
import { useState, useEffect } from "react";
import { getUserProjects } from "./actions";
import { client } from "@/appwrite";
import { FaJava } from "react-icons/fa";
import { TbBrandKotlin } from "react-icons/tb";
import { Edit, EllipsisVertical, Search, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteProject, EditProject } from "@/components/utils/project-actions";
import Link from "next/link";
import NoProject from "@/components/page/no-projects";
import NoProjects from "@/components/page/no-projects";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function ProjectList({
  className,
  projectData,
}: {
  projectData: Project[];
  className?: string;
}) {
  const [projects, setProjects] = useState<Project[]>(projectData);
  const [showDeleteProject, setShowDeleteProject] = useState<string | null>(
    null,
  );
  const [showRenameProject, setShowRenameProject] = useState<string | null>(
    null,
  );
  const [isEmpty, setIsEmpty] = useState(projects.length === 0);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    client.subscribe(["documents"], (response) => {
      getUserProjects().then((projects) => {
        setProjects(projects);
        setIsEmpty(projects.length === 0);
      });
    });
  }, []);

  return (
    <>
      {isEmpty && <NoProjects />}
      {!isEmpty && (
        <InputGroup className="mb-4">
          <InputGroupInput
            placeholder="搜尋專案..."
            value={searchText}
            onChange={(x) => setSearchText(x.target.value)}
          />
          <InputGroupAddon align="inline-end">
            {searchText === "" ? (
              <Search />
            ) : (
              <Button variant="ghost" onClick={() => setSearchText("")}>
                <X />
              </Button>
            )}
          </InputGroupAddon>
        </InputGroup>
      )}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {projects.map(
          (project) =>
            project.name
              .toLowerCase()
              .includes(searchText.toLowerCase().trim()) && (
              <div
                className="p-2 border rounded-lg flex items-center gap-2 hover:bg-green-50  duration-100 justify-between"
                key={project.$id}
              >
                <Link href={`/ide?project=${project.$id}`} className="w-full">
                  <div className="flex items-center">
                    <div className="text-3xl px-1">
                      {project.language === "kotlin" ? (
                        <TbBrandKotlin />
                      ) : (
                        <FaJava />
                      )}
                    </div>
                    <div className="block ml-1">
                      <p className="font-medium">{project.name}</p>
                      <p className="text-gray-500 text-xs">
                        {project.language[0].toUpperCase() +
                          project.language.slice(1)}
                      </p>
                    </div>
                  </div>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"outline"}>
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => setShowDeleteProject(project.$id)}
                    >
                      <Trash /> 刪除
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setShowRenameProject(project.$id)}
                    >
                      <Edit />
                      編輯
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DeleteProject
                  projectId={project.$id}
                  isOpen={showDeleteProject == project.$id}
                  setOpen={(x) => setShowDeleteProject(x ? project.$id : null)}
                />
                <EditProject
                  project={project}
                  isOpen={showRenameProject == project.$id}
                  setOpen={(x) => setShowRenameProject(x ? project.$id : null)}
                />
              </div>
            ),
        )}
      </div>
    </>
  );
}
