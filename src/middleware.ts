// export { default } from "next-auth/middleware";
// import { getSession } from "next-auth/react";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {}

// /* export const config = {
//   matcher: ["/", "/add", "/profile", "/update/:path*"],
// }; */
// export const config = {
//   matcher: ["/admin*", "/admin"],
// };

import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    console.log("Ini Next Auth Token: ", req.nextauth.token);
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.roles !== "ADMIN"
    ) {
      return NextResponse.rewrite(new URL("/", req.url));
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

export const config = { matcher: ["/admin"] };
