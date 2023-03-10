import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // find all wishlists
  const result = await prisma.wishlist.findMany();
  res.json(result);
}
