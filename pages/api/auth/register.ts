import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, wishlist_name } = req.body;
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    res.status(400).send("User already exists");
  } else {
    // create a user
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
      },
    });

    // create a wishlist for the user with title passed in during registration
    const wishlist = await prisma.wishlist.create({
      data: {
        title: wishlist_name,
        user_id: user.id,
        description: "",
        image_url: "",
      },
    });

    res.status(200).json({ user, wishlist });
  }
}
