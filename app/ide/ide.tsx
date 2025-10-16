"use client";
import {
  ArrowLeft,
  Check,
  Edit,
  LoaderIcon,
  Play,
  Square,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import "@xterm/xterm/css/xterm.css";
import { getProjectInfo, updateProjectContent } from "./ide-actions";
import { client } from "@/appwrite";
import { TbBrandKotlin } from "react-icons/tb";
import { FaJava } from "react-icons/fa";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EditProject } from "@/components/utils/project-actions";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function Ide({
  initContent,
  projectId,
}: {
  initContent: any;
  projectId: string;
}) {
  const [project, setProject] = useState(initContent);
  const [code, setCode] = useState((project.content as string) || "");
  const [isRunning, setIsRunning] = useState(false);
  const [isBackup, setIsBackup] = useState(true);
  const [showEditProject, setShowEditProject] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstanceRef = useRef<any>(null);
  const fitAddonRef = useRef<any>(null);
  const websocketRef = useRef<WebSocket | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    client.subscribe(["documents"], (response) => {
      if (
        response.events.includes(
          `databases.db.collections.projects.documents.${project.$id}.update`,
        )
      ) {
        getProjectInfo(projectId).then((project) => {
          setProject(project);
        });
      }
    });
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      updateProjectContent(projectId, code).then(() => {});
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [code]);

  useEffect(() => {
    const status = code == project.content;
    setIsBackup(status);
  }, [code, project]);

  async function stopCode() {
    if (websocketRef.current) {
      websocketRef.current.close();
    }
  }

  async function runCode() {
    setIsRunning(true);
    if (terminalInstanceRef.current) {
      terminalInstanceRef.current.dispose();
    }
    terminalInstanceRef.current = null;
    fitAddonRef.current = null;
    let [{ Terminal }, { FitAddon }] = await Promise.all([
      import("@xterm/xterm"),
      import("@xterm/addon-fit"),
    ]);
    terminalInstanceRef.current = new Terminal({
      theme: {
        background: "#ffffff",
        foreground: "#000000",
        cursor: "#A965FF",
      },
      cursorBlink: true,
      fontSize: 15,
      fontFamily: "JetBrains Mono, monospace",
    });
    fitAddonRef.current = new FitAddon();
    const terminal = terminalInstanceRef.current;
    const fitAddon = fitAddonRef.current;
    terminal.loadAddon(fitAddon);
    if (terminalRef.current) {
      terminal.open(terminalRef.current!);
      fitAddon.fit();
    }
    window.addEventListener("resize", () => {
      fitAddon.fit();
    });
    // websocket
    const protocol = process.env.NEXT_PUBLIC_BACKEND_HOST?.includes(
      "08-skillify-worker",
    )
      ? "wss"
      : "ws";
    websocketRef.current = new WebSocket(
      `${protocol}://${process.env.NEXT_PUBLIC_BACKEND_HOST}/run/${project.language}`,
    );
    let ws = websocketRef.current;
    const req = {
      type: "code",
      data: {
        filename: project.filename,
        content: code,
      },
    };
    ws.onopen = () => {
      ws.send(JSON.stringify(req));
    };
    ws.onmessage = (event) => {
      const message: ShellResponse = JSON.parse(event.data);
      terminal.write(message.data);
    };
    ws.onclose = () => {
      terminal.write(`\r\n[ 執行階段結束 ]\r\n`);
      setIsRunning(false);
    };
    terminal.onData((data: any) => {
      const message = {
        type: "shell",
        data: data,
      };
      ws.send(JSON.stringify(message));
    });
  }

  return (
    <>
      <EditProject
        project={project}
        isOpen={showEditProject}
        setOpen={setShowEditProject}
      />
      <div className="block" style={{ height: "calc(100vh - 70px)" }}>
        <div className="flex items-center justify-between" ref={navbarRef}>
          <div>
            <div className="flex items-center gap-2">
              <Link href="/projects">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <span className="text-3xl">
                {project.language === "kotlin" ? <TbBrandKotlin /> : <FaJava />}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <p className="font-bold text-xl">{project.name}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowEditProject(true)}
                    >
                      <Edit />
                    </Button>
                  </div>
                </div>
                <p className="text-xs monospace">{project.filename}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isRunning ? (
              <div className="flex items-center text-gray-400 font-bold gap-1 text-xs">
                <LoaderIcon className="animate-spin h-4 w-4" />
                <p>執行中</p>
              </div>
            ) : (
              <Badge
                variant="outline"
                className={`${isBackup ? "text-gray-400" : "text-gray-500"}`}
              >
                {isBackup ? <Check /> : <X />}
                {isBackup ? "專案已儲存" : "專案尚未儲存"}
              </Badge>
            )}
            {isRunning ? (
              <Button
                onClick={stopCode}
                className="bg-red-500 hover:bg-red-600"
              >
                <Square />
                結束
              </Button>
            ) : (
              <Button
                onClick={runCode}
                className="bg-green-500 hover:bg-green-600"
              >
                <Play />
                執行
              </Button>
            )}
          </div>
        </div>
        <div
          className="grid lg:grid-cols-1 grid-cols-1 gap-2"
          style={{
            height: `calc(100vh - ${40 + 80}px)`,
          }}
        >
          <div className="rounded-lg overflow-hidden border-2 m-2">
            <MonacoEditor
              height="90vh"
              defaultLanguage={project.language}
              value={code}
              onChange={(x) => setCode(x || "")}
              options={{
                minimap: { enabled: false },
              }}
            />
          </div>
          <div className="rounded-lg border-2 m-2 p-4">
            <div ref={terminalRef}></div>
          </div>
        </div>
      </div>
    </>
  );
}
