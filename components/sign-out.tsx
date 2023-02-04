"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import styles from "@/styles/Signout.module.css";

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <button className={styles.button} onClick={handleSignOut}>
      Sign out
    </button>
  );
}
