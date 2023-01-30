import { unstable_getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await unstable_getServerSession();

  return <div>{session && <p>Signed in as {session.user?.email}</p>}</div>;
}
