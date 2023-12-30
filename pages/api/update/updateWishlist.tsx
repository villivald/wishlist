import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.body.userId;
  const listName = req.body.listName;
  const listPicture = req.body.listPicture;

  const result = await prisma.wishlist.update({
    where: {
      user_id: userId,
    },
    data: {
      image_url: listPicture,
      title: listName,
    },
  });

  res.json(result);
}
