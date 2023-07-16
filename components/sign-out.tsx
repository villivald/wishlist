"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import Spinner from "@/components/spinner";

import styles from "@/styles/Signout.module.css";

export default function SignOut() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignOut = () => {
    setLoading(true);
    signOut();
    router.push("/");
  };

  return (
    <button className={styles.button} onClick={handleSignOut}>
      {loading ? <Spinner size="small" /> : "Sign Out"}
    </button>
  );
}
