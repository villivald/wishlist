import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
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

    // create a wishlist for the user with name containing the user's email
    const wishlist = await prisma.wishlist.create({
      data: {
        name: `${email}'s wishlist`,
        user_id: user.id,
        description: "Wishlist for " + email,
      },
    });

    res.status(200).json({ user, wishlist });
  }
}
