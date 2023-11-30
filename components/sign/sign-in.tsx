"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/styles/Signin.module.css";

export default function SignIn() {
  const path = usePathname();

  return (
    <Link
      className={styles.signin}
      data-active={path === "/login"}
      href="/login"
    >
      Sign in
    </Link>
  );
}
