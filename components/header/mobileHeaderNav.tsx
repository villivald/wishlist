"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import styles from "@/styles/MobileHeaderNav.module.css";

export default function MobileHeaderNav() {
  const path = usePathname();

  const getPathActive = (path: string) => {
    if (path === "/") {
      return "home";
    } else if (path === "/mywishlist") {
      return "profile";
    } else if (path !== "/login") {
      return "list";
    }
  };

  return (
    <span className={styles.nav}>
      <Link
        className={styles.link}
        href="/"
        data-active={getPathActive(path as string) === "home"}
      >
        <Image src="/home.svg" alt="Logo" width={24} height={24} />
      </Link>
      <Link
        href="/mywishlist"
        prefetch={false}
        data-active={getPathActive(path as string) === "profile"}
      >
        <Image src="/profile.svg" alt="Logo" width={24} height={24} />
      </Link>
      <Link
        href="/publicWishlists"
        data-active={getPathActive(path as string) === "list"}
      >
        <Image src="/list.svg" alt="Logo" width={24} height={24} />
      </Link>
    </span>
  );
}
