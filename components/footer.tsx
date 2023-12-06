import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="https://github.com/villivald/wishlist">
        <Image
          src="/github.svg"
          alt="GitHub - project code"
          width={32}
          height={32}
        />
      </Link>
      <Link href="https://villivald.com/">
        <Image src="/safari.svg" alt="Own website" width={32} height={32} />
      </Link>
      <Link href="https://notacult.social/@villivald">
        <Image
          src="/mastodon.svg"
          alt="Personal mastodon account"
          width={32}
          height={32}
        />
      </Link>
    </footer>
  );
}
