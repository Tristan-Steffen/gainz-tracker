import { Prisma, User } from "@prisma/client";
import { hash } from "bcrypt";
import { withSession } from "lib/auth";
import { CreateUserSchema } from "lib/validators";
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/db';
import { UserData } from "../../lib/types";

export default withSession(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData | User[] | { error: string }>
) {

  console.log({ m: req.method, b: req.body })

  if (req.method === "POST") {

    const p = CreateUserSchema.safeParse(req.body);
    if (p.success === false) {
      return {
        notFound: true
      }
    }

    const { username, password } = req.body;

    const hashedPassword = await hash(password, 10);

    try {

      const user = await db.user.create({
        data: {
          username,
          hash: hashedPassword
        }
      })

      const userData = { id: user.id, isAdmin: user.isAdmin, username: user.username };

      req.session["user"] = userData;

      await req.session.save();

      return res.status(200).json(userData);

    } catch (err) {

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          return res.status(403).json({ error: "User with name " + username + " already exists." });
        }
      }

      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      }

      res.status(500).json({ error: "Internal Server Errror" })

    }

  }

  if (req.method === "GET") {
    return res.json(await db.user.findMany())
  }
})
