"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
      <Image
        src="/wave.svg"
        alt="Sign out icon - waving hand"
        width={24}
        height={24}
      />
    </button>
  );
}
