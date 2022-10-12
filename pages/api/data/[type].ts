

import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib';
import { withSession } from '../../../lib/auth';

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

    return res.json({});

  },
);
