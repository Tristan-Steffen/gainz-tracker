import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import type { NextApiHandler } from "next";
import { GetServerSideProps } from "next";
import { ironConfig } from "./config";

export const ensureSession = withSession((req) => {
  if (!req.session.user) {
    return {
      redirect: {
        destination: "/login"
      }
    }
  }

  return {
    props: {
      user: req.session.user
    }
  }
})

export const ensureSessionSsr = withSessionSsr(async function({ req }) {
  const user = req.session?.user || null;

  if (!req.session.user) {
    return {
      props: {},
      redirect: {
        destination: "/login"
      }
    }
  }


  return {
    props: {
      user
    }
  }
})
export function withSession(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, ironConfig)
}


export function withSessionSsr(handler: GetServerSideProps) {
  return withIronSessionSsr(handler, ironConfig);
}

