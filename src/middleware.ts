import { withAuth } from "next-auth/middleware";

export default withAuth({
  // 이 콜백은 matcher에 정의된 경로에 대한 접근 권한을 결정합니다.
  // token이 없으면 `false`를 반환하고, NextAuth.js는 `pages.signIn`으로 리다이렉트합니다.
  // token이 있으면 `true`를 반환하고, 요청은 진행됩니다.
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  // 인증되지 않은 사용자가 보호된 경로(예: /workspace)에 접근하려고 할 때 리다이렉트될 페이지입니다.
  pages: {
    signIn: "/login",
  },
});

export const config = {
  // 미들웨어가 실행될 경로들. 이제 `보호된 경로`만 포함합니다.
  // `auth` 라우트(API 라우트)는 자동으로 보호됩니다.
  matcher: ["/workspace"],
};
