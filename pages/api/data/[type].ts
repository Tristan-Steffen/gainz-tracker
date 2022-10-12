

import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib';
import { withSession } from '../../../lib/auth';
import { createDataPoints } from '../../../lib/data';

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

    const { type } = req.query;

    console.log({ type, body: req.body })

    if (type === "sleep") {

      const { start, amount } = req.body;

      const datapoint = await createDataPoints(user, {
        "sleep": {
          start,
          amount
        }
      })

      console.log({ datapoint })

      return res.redirect("/home")
    }

    if (type === "height") {

      const height = req.body;

      const datapoints = await createDataPoints(user, {
        height,
      })

      console.log({ datapoints })

      return res.redirect("/home")
    }

    if (type === "weight") {
      const { weight, fat_percent, muscle_percent } = req.body;

      const datapoints = await createDataPoints(user, {
        weight: parseFloat(weight),
        fat_percent: parseFloat(fat_percent),
        muscle_percent: parseFloat(muscle_percent)
      })

      console.log({ datapoints })

      return res.redirect("/home")

    }


    return res.json({});

  },
);
