import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiHandler } from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      admin?: boolean;
    };
  }
}

export default function withSession(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  )
}
