import Link from "next/link";

import Toaster from "@/components/toaster";
import AuthStatus from "@/components/auth-status";
import SignOut from "@/components/sign-out";
import MobileHeaderNav from "@/components/mobileHeaderNav";

import "@/styles/globals.css";
import styles from "@/styles/Layout.module.css";
import DesktopHeaderNav from "@/components/desktopHeaderNav";

import { AppProvider } from "./providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await AuthStatus();

  return (
    <html lang="en">
      <body>
        <AppProvider>
          <menu className={styles.menu}>
            <DesktopHeaderNav />
            <MobileHeaderNav />
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
        </AppProvider>
      </body>
    </html>
  );
}
