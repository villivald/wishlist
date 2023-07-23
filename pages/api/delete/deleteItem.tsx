import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

// delete single wishlist item by id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.body.id;

  const deletedItem = await prisma.wishlistItem.delete({
    where: { id },
  });

  res.json(deletedItem);
}
