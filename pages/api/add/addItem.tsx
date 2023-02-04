import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, title, price, url, image_url, description } = req.body;

  // find user by email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // find wishlist by user id
  const wishlist = await prisma.wishlist.findUnique({
    where: {
      user_id: user?.id,
    },
  });

  // add item to wishlist
  const result = await prisma.wishlistItem.create({
    data: {
      user_id: user?.id || 0,
      wishlist_id: wishlist?.id || 0,
      title,
      price,
      url,
      image_url,
      description,
    },
  });
  res.json(result);
}
