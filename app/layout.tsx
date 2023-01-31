import "@/styles/globals.css";
import styles from "@/styles/Layout.module.css";

import Toaster from "@/components/toaster";
import AuthStatus from "@/components/auth-status";
import Link from "next/link";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await AuthStatus();
  return (
    <html lang="en">
      <body>
        <Link className={styles.homepageLink} href="/">
          🏡
        </Link>
        <Toaster />
        <div>{session && <p>Signed in as {session.user?.email}</p>}</div>
        {children}
      </body>
    </html>
  );
}
