import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.body.id;

  // find wishlist item by id
  const result = await prisma.wishlistItem.update({
    where: {
      id: id,
    },
    data: {
      ready: true,
    },
  });

  res.json(result);
}
