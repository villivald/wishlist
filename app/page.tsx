import Link from "next/link";

import styles from "@/styles/MainPage.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
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
