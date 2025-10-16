import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { signIn, auth, signOut } from "@/auth";
import Link from "next/link";

export default async function NavBar() {
  const session = await auth();
  const navItems: NavItem[] = [
    { name: "IDE", href: "/projects" },
    { name: "GuideBook", href: "/book" },
  ];
  return (
    <nav className="py-3 px-4 backdrop-blur-xl fixed w-full top-0">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/worldskills-logo.svg"
              alt="08 Skillify Logo"
              className="hover:drop-shadow-md duration-200"
              width={40}
              height={40}
            />
          </Link>
          <ul className="flex list-none">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="text-lg font-medium hover:bg-green-100 hover:ring ring-green-200 hover:opacity-[80%] hover:drop-shadow-md px-3 py-1 rounded-full duration-200"
              >
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-10 h-10">
                <AvatarImage src={session?.user?.image} alt="User Avatar" />
                <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-3">
              <DropdownMenuLabel>
                <div>
                  <p className="text-lg font-medium">{session.user.name}</p>
                  <p className="text-sm text-gray-400">{session.user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
              <DropdownMenuItem
                onClick={async () => {
                  "use server";
                  await signOut();
                }}
              >
                登出
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div>
            <Button
              onClick={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <User />
              登入
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
