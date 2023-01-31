import { getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await getServerSession();

  return session;
}
