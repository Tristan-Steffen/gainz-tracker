
import type { NextApiRequest, NextApiResponse } from 'next';
import { withSession } from "../../lib/auth";
import { createDataPoints } from '../../lib/data';
import { db } from '../../lib/db';
import { DataPointParam } from '../../lib/types';

export default withSession(
  async function loginRoute(req: NextApiRequest,
    res: NextApiResponse) {

    const userId = req.session?.user?.id;
    if (!userId) {
      return {
        notFound: true
      }
    }

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return {
        notFound: true
      }
    }

    const params = req.body as DataPointParam;

    const dataPoints = await createDataPoints(user, params);

    return res.json(dataPoints);

  },
);
