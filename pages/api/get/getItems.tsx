import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.body.email;

  // find user by email
  const user = await prisma.user.findUnique({
    where: {
      email: email || "",
    },
  });

  // find wishlist by user id
  const wishlist = await prisma.wishlist.findUnique({
    where: {
      user_id: user?.id,
    },
  });

  // find wishlist items by wishlist id
  const result = await prisma.wishlistItem.findMany({
    where: {
      wishlist_id: wishlist?.id,
    },
  });

  res.json(result);
}
