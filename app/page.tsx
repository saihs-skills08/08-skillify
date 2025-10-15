import Image from "next/image";
import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default async function Home() {
  const session = await auth();
  return (
    <div className="p-5 fade-in block fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <div className="flex flex-col items-end">
        <Image
          src="/worldskills-logo.svg"
          alt="08 Skillify Logo"
          width={100}
          height={100}
          className="mr-5 mb-[-10px]"
          priority
        />
        <h1
          className="flex text-5xl font-extrabold bg-gradient-to-tr from-green-500 text-transparent to-[#66C894] bg-clip-text leading-15 items-end"
          id="title"
        >
          08 Skillify
          <div className="h-2 w-5 bg-[#66C894] animate-caret-blink mb-2"></div>
        </h1>
      </div>
      <p className="mt-5 text-lg">
        培訓GuideBook、練習題目
        <br />
        Kotlin與Java的線上IDE
      </p>
      <div className="mt-5 flex gap-2">
        {!session?.user && (
          <Button
            onClick={async () => {
              "use server";
              await signIn("google");
            }}
            className="w-full"
            variant="outline"
          >
            <User />
            登入
          </Button>
        )}
      </div>
    </div>
  );
}
