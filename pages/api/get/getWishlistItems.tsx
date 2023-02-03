// get wishlist items by id

import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

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
