import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  let isLogin = req.cookies.get("TOKEN") ? true : false;
  let loginRoute = [
    "/user/dashboard",
  ];
  let logoutRoute = ["/user/login"];

  //redirect to right place
  if (!isLogin && loginRoute.some((item) => req.nextUrl.pathname.startsWith(item))) {
    return NextResponse.redirect(new URL("/user/login", req.url));
  }

  if (isLogin && logoutRoute.some((item) => req.nextUrl.pathname.startsWith(item))) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}