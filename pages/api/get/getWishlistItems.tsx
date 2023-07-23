import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.body.id;

  // find wishlist items by wishlist id
  const result = await prisma.wishlistItem.findMany({
    where: {
      wishlist_id: id,
    },
  });

  res.json(result);
}
