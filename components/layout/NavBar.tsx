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
import ShadowWarpper from "./ShadowWarpper";
import { getUserInfo } from "../utils/getUserInfo";
import { Badge } from "../ui/badge";
import NavLinkWrapper from "./NavLinkWrapper";

export default async function NavBar() {
  const session = await auth();
  const userInfo = await getUserInfo(session?.user?.id || "");
  const navItems: NavItem[] = [
    { name: "專案", href: "/projects" },
    { name: "文檔", href: "/book" },
    { name: "題目", href: "/tasks" },
  ];
  return (
    <ShadowWarpper className="py-3 px-4 bg-white w-full top-0 z-10 fixed">
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
          <ul className="flex list-none nav-links-list">
            {navItems.map((item) => (
              <NavLinkWrapper key={item.name} item={item} />
            ))}
          </ul>
        </div>
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-10 h-10 hover:drop-shadow-lg duration-200">
                <AvatarImage
                  src={session?.user?.image as string}
                  alt="User Avatar"
                />
                <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-3">
              <DropdownMenuLabel>
                <div>
                  <p className="text-lg font-medium">{session.user.name}</p>
                  <Badge className="mb-1">{userInfo.role.toUpperCase()}</Badge>
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
    </ShadowWarpper>
  );
}
