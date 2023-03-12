import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

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
