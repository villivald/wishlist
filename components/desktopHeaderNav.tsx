"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/styles/DesktopHeaderNav.module.css";

export default function DesktopHeaderNav() {
  const path = usePathname();

  const getPathActive = (path: string) => {
    if (path === "/") {
      return "home";
    } else if (path === "/mywishlist") {
      return "profile";
    } else {
      return "list";
    }
  };

  return (
    <span className={styles.nav}>
      <Link href="/" data-active={getPathActive(path as string) === "home"}>
        Home page
      </Link>
      <Link
        href="/mywishlist"
        prefetch={false}
        data-active={getPathActive(path as string) === "profile"}
      >
        My Wishlist
      </Link>
      <Link
        href="/publicWishlists"
        data-active={getPathActive(path as string) === "list"}
      >
        Public Wishlists
      </Link>
    </span>
  );
}
