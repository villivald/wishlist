import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user_id = req.body.user_id;

  const result = await prisma.wishlist.findUnique({
    where: {
      user_id: user_id || 2,
    },
  });

  res.json(result);
}
