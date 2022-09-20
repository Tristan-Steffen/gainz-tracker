// /middleware.ts
import { getIronSession } from "iron-session/edge";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });

  // do anything with session here:
  const { user } = session;

  // like mutate user:
  // user.something = someOtherThing;
  // or:
  // session.user = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();

  console.log("from middleware", { user });

  // demo:
  if (user?.admin !== "true") {
    // unauthorized to see pages inside admin/
    return NextResponse.redirect(new URL('/unauthorized', req.url)) // redirect to /unauthorized page
  }

  return res;
};

export const config = {
  matcher: "/admin",
};
