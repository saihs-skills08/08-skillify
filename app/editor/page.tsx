"use client";
import "@xterm/xterm/css/xterm.css";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ArrowLeft, PlayIcon } from "lucide-react";
import { Play } from "next/font/google";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function Editor() {
  const [code, setCode] = useState("");
  const [filename, setFilename] = useState("Skills.java");
  const terminalRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket>(null);
  const termBackground = "#1F1E2E";

  let terminal: any;
  let fitAddon: any;

  const runCode = () => {
    const data: ShellResponse = {
      type: "code",
      data: {
        filename: filename,
        content: code,
      } as CodeFile,
    };
    if (wsRef.current) {
      console.log("Sending code to server:", data);
      wsRef.current.send(JSON.stringify(data));
    }
  };

  useEffect(() => {
    async function loadTerminal() {
      const ws = new WebSocket("ws://localhost:8000/shell");
      wsRef.current = ws;
      const [{ Terminal }, { FitAddon }] = await Promise.all([
        import("@xterm/xterm"),
        import("@xterm/addon-fit"),
      ]);

      terminal = new Terminal({
        theme: {
          background: termBackground,
          cursor: "#A965FF",
        },
        fontSize: 14,
        fontFamily: "JetBrains Mono, monospace",
        cursorBlink: true,
        cols: 80,
        rows: 30,
      });

      ws.onmessage = (event) => {
        const message: ShellResponse = JSON.parse(event.data);
        terminal.write(message.data);
      };
      terminal.onData((data: any) => {
        const message = {
          type: "shell",
          data: data,
        };
        ws.send(JSON.stringify(message));
      });
      fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);

      if (terminalRef.current) {
        terminal.open(terminalRef.current);
        fitAddon.fit();
      }

      window.addEventListener("resize", () => {
        fitAddon.fit();
      });
    }

    loadTerminal();

    return () => {
      wsRef.current.close();
      if (terminal) {
        terminal.dispose();
      }
    };
  }, []);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-md">
            <Button variant={"ghost"}>
              <ArrowLeft />
            </Button>
          </Link>
          <Input
            placeholder="Skills.java"
            value={filename}
            onChange={(x) => {
              setFilename(x.target.value);
            }}
          />
        </div>
        <Button className="bg-green-500 hover:bg-green-600" onClick={runCode}>
          <PlayIcon />
          Run
        </Button>
      </div>
      <div className="flex h-full flex-row">
        <div className="w-1/2 rounded-xl overflow-hidden m-2 border">
          <MonacoEditor
            defaultLanguage="java"
            defaultValue={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
            }}
          />
        </div>
        <div
          className={`w-1/2 rounded-xl overflow-hidden m-2 p-3 border bg-[#1F1E2E]`}
        >
          <div ref={terminalRef}></div>
        </div>
      </div>
    </div>
  );
}
