"use client";
import styles from "@/styles/Signout.module.css";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div className={styles.container}>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
