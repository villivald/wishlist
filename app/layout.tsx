import Link from "next/link";

import Toaster from "@/components/toaster";
import AuthStatus from "@/components/auth-status";
import SignOut from "@/components/sign-out";

import "@/styles/globals.css";
import styles from "@/styles/Layout.module.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await AuthStatus();

  return (
    <html lang="en">
      <body>
        <menu className={styles.menu}>
          <span>
            <Link href="/">Home page</Link>
            <Link href="/protected" prefetch={false}>
              My Wishlist
            </Link>
            <Link href="/publicWishlists">Public Wishlists</Link>
          </span>
          <Toaster />

          <div>
            {session && (
              <p>
                Signed in as {session.user?.email} <SignOut />
              </p>
            )}
          </div>
        </menu>
        {children}
      </body>
    </html>
  );
}
