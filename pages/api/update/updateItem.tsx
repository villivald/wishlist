import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.body.id;
  const title = req.body.title;
  const price = req.body.price;
  const url = req.body.url;
  const description = req.body.description;
  const image_url = req.body.image_url;
  const rating = req.body.rating;

  // find wishlist item by id
  const result = await prisma.wishlistItem.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      price: price,
      url: url,
      description: description,
      image_url: image_url,
      rating: rating,
    },
  });

  res.json(result);
}
