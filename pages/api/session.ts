import { compare } from 'bcrypt';
import { withSession } from "lib/auth";
import { db } from 'lib/db';
import { UserData } from 'lib/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withSession(
  async function loginRoute(req: NextApiRequest,
    res: NextApiResponse<UserData | { error: string }>) {

    if (req.method === "POST") {

      const { username, password } = req.body;

      if (!username || !password) {
        return {
          notFound: true
        }
      }

      const user = await db.user.findFirst({ where: { username } })

      if (!user) {
        return {
          notFound: true
        }
      }

      const passwordMatches = await compare(password, user.hash);

      if (!passwordMatches) {
        return res.status(403).json({ error: "Wrong Password" });
      }

      const userData = { id: user.id, isAdmin: user.isAdmin, username: user.username };
      req.session["user"] = userData;
      await req.session.save();

      return res.json(userData);

    }
  },
);
