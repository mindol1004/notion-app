import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const WORKSPACE_PATH = "/workspace";
const PUBLIC_PATHS = ["/login", "/register", "/"];

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // If the user is authenticated and tries to access a public path,
    // redirect them to /workspace
    if (token && PUBLIC_PATHS.includes(pathname)) {
      return NextResponse.redirect(new URL(WORKSPACE_PATH, req.url));
    }

    // If the user is not authenticated and tries to access /workspace, redirect to /login
    if (!token && pathname === WORKSPACE_PATH) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Continue to the requested page if no redirection is needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [WORKSPACE_PATH, ...PUBLIC_PATHS],
};
