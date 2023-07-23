import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // find all wishlists
  const result = await prisma.wishlist.findMany();
  res.json(result);
}
