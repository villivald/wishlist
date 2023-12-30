import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.body.userId;
  const avatar = req.body.avatar;

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      avatar: avatar,
    },
  });

  res.json(result);
}
