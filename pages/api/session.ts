import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import type {User} from "@prisma/client"
import { db } from '../../lib/db'
import {hash, compare} from "bcrypt";
import { withIronSessionApiRoute } from "iron-session/next";


export default withIronSessionApiRoute(
  async function loginRoute(req: NextApiRequest,
  res: NextApiResponse<{ok:boolean}>) {

    if(req.method === "POST"){


    const {username, password} = req.body;

    if(!username || !password){
      return {
        notFound:true
      }
    }

    const user = db.user.findFirst({where: {username}})
    


    // get user from database then:
    req.session.user = {};
    await req.session.save();
    res.send({ ok: true });

    }
  },
  {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);
