import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const WORKSPACE_PATH = "/workspace";

export default withAuth(
  function middleware(req) {
    // 이 미들웨어는 주로 protected 경로 (WORKSPACE_PATH)를 처리합니다.
    // 다른 경로는 authorized 콜백에서 처리되거나, NextAuth.js의 기본 동작에 따릅니다.
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // / (루트), /login, /register 페이지는 인증 여부와 관계없이 항상 접근 허용
        if (pathname === "/" || pathname === "/login" || pathname === "/register") {
            return true;
        }
        // 그 외 매칭된 경로(예: /workspace)는 토큰이 있어야 접근 허용
        return !!token;
      },
    },
    // pages.signIn 설정은 authOptions에서 이미 정의되어 있으므로 여기서는 생략
  }
);

export const config = {
  // 미들웨어를 적용할 경로를 명시합니다.
  // / (루트), /login, /register는 여기에 포함하지 않아 직접 접근 가능하게 합니다.
  matcher: [WORKSPACE_PATH],
};
