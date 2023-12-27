import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.body.email;

  const user = await prisma.user.findUnique({
    where: {
      email: email || "",
    },
  });

  res.json(user);
}
