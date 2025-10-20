import { NextRequest, NextResponse } from "next/server";
import { getUserInfo } from "./components/utils/getUserInfo";

export async function middleware(request: NextRequest) {
  const exportOnly = ["/dashboard", "/tasks/new"];
  if (exportOnly.includes(request.nextUrl.pathname)) {
    const user = await getUserInfo();
    if (user.role !== "expert") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  return NextResponse.next();
}
