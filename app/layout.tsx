import Link from "next/link";
import Image from "next/image";

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
          <span>
            <Link href="/">
              <Image src="/home.svg" alt="Logo" width={24} height={24} />
            </Link>
            <Link href="/protected" prefetch={false}>
              <Image src="/profile.svg" alt="Logo" width={24} height={24} />
            </Link>
            <Link href="/publicWishlists">
              <Image src="/list.svg" alt="Logo" width={24} height={24} />
            </Link>
          </span>
          <Toaster />

          <div>
            {session ? (
              <p>
                <span>Signed in as {session.user?.email}</span> <SignOut />
              </p>
            ) : (
              <p>
                <Link href="/login">Sign in</Link>
              </p>
            )}
          </div>
        </menu>
        {children}
      </body>
    </html>
  );
}
