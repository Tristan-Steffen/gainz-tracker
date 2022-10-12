import { compare } from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withSession } from "../../lib/auth";
import { db } from '../../lib/db';
import { UserData } from '../../lib/types';

export default withSession(
  async function loginRoute(req: NextApiRequest,
    res: NextApiResponse<UserData | null>) {

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

      console.log({ passwordMatches })
      if (!passwordMatches) {
        return res.status(403).send(null);
      }

      const userData = { id: user.id, isAdmin: user.isAdmin, username: user.username };

      // get user from database then:
      req.session["user"] = userData;
      await req.session.save();
      return res.redirect("/home");

    }
  },
);
