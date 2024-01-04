"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useState, useEffect } from "react";

interface Props {
  session: any;
  styles: any;
}

export default function UserProfileLink({ session, styles }: Props) {
  const path = usePathname();

  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const email = session?.user?.email;

    fetch("/api/get/getUserProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAvatar(data.avatar);
      });
  }, [session]);

  return (
    <Link href="/profile">
      <Image
        className={styles.avatar}
        data-active={path === "/profile"}
        src={avatar || "/avatar.svg"}
        alt="Avatar of a ueser profile"
        width={30}
        height={30}
      />
      <span className={styles.user}>{session.user?.email}</span>
    </Link>
  );
}
