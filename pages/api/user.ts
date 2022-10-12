import type { User } from "@prisma/client";
import { hash } from "bcrypt";
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/db';
import { UserData } from "../../lib/types";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData | User[]>
) {

  if (req.method === "POST") {

    const { username, password } = req.body;

    if (!username || !password) {
      //TODO: implement validation
      return {
        notFound: true
      }
    }

    const hashedPassword = await hash(password, 10);


    const newUser = await db.user.create({
      data: {
        username,
        hash: hashedPassword
      }
    })

    return res.status(200).json(newUser);
  }

  if (req.method === "GET") {
    return res.json(await db.user.findMany())
  }
}
