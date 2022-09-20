import type { NextApiRequest, NextApiResponse } from 'next';
import { withSession } from "../../lib";
import { db } from '../../lib/db';



export default withSession(
  async function loginRoute(req: NextApiRequest,
    res: NextApiResponse<{ ok: boolean }>) {

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

      // get user from database then:
      // req.session["user"] = { id: user.id, isAdmin: user.isAdmin };
      await req.session.save();
      res.send({ ok: true });

    }
  },
);
