import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        if (pathname === "/" || pathname === "/login" || pathname === "/register") {
            return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/workspace"],
};
