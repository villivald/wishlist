import Link from "next/link";

import AuthStatus from "@/components/auth-status";

import styles from "@/styles/MainPage.module.css";

export default async function Home() {
  const session = await AuthStatus();

  return (
    <div className={styles.wrapper} data-loggedin={session ? true : false}>
      <div className={styles.container}>
        <span>
          <span></span>
          <span></span>
        </span>
        <Link href="/mywishlist" prefetch={false}>
          WISHLIST
        </Link>
        <span>
          <span></span>
          <span></span>
        </span>
      </div>
    </div>
  );
}
