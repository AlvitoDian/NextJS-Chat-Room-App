import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    //? Admin Page Protect
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.roles !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    //? User Edit Protect
    if (
      !req.nextauth?.token &&
      req.nextUrl.pathname.startsWith("/user/edit/")
    ) {
      return NextResponse.redirect("/auth/login");
    }

    //? Chat Room Protect
    if (!req.nextauth?.token && req.nextUrl.pathname.startsWith("/chatroom/")) {
      return NextResponse.redirect("/auth/login");
    }

    //? Direct Message Protect
    if (
      !req.nextauth?.token &&
      req.nextUrl.pathname.startsWith("/direct-message/")
    ) {
      return NextResponse.redirect("/auth/login");
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin", "/user/edit/:id*", "/chat-room/:id*", "/direct-message/"],
};
