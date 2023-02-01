// function for adding an item to the Wishlist table
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name, price, url, image_url } = req.body;

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

  const result = await prisma.wishlistItem.create({
    data: {
      user_id: user?.id,
      wishlist_id: wishlist?.id,
      name,
      price,
      url,
      image_url,
    },
  });
  res.json(result);
}
