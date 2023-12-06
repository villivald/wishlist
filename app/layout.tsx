import Link from "next/link";
import Image from "next/image";

import Toaster from "@/components/common/toaster";
import AuthStatus from "@/components/auth-status";
import SignOut from "@/components/sign/sign-out";
import SignIn from "@/components/sign/sign-in";
import MobileHeaderNav from "@/components/header/mobileHeaderNav";
import DesktopHeaderNav from "@/components/header/desktopHeaderNav";
import Footer from "@/components/footer";

import { AppProvider } from "./providers";

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
        <AppProvider>
          <menu className={styles.menu}>
            <DesktopHeaderNav />
            <MobileHeaderNav />
            <Toaster />
            <div>
              {session ? (
                <section>
                  <p>Signed in as</p>
                  <p>
                    <Link href="/profile">
                      <Image
                        src="/avatar.svg"
                        alt="Logo"
                        width={30}
                        height={30}
                      />
                      <span className={styles.user}>{session.user?.email}</span>
                    </Link>
                    <SignOut />
                  </p>
                </section>
              ) : (
                <SignIn />
              )}
            </div>
          </menu>
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
