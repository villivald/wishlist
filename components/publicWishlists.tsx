"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import styles from "@/styles/PublicWishlists.module.css";

export default function PublicWishlists() {
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    fetch("/api/get/getWishlists")
      .then((res) => res.json())
      .then((data) => {
        setWishlists(data);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Public Wishlists</h1>
      <div className={styles.wishlists}>
        {wishlists?.map((item: { id: number; title: string }) => (
          <Link
            href={`/wishlist/${item.id}`}
            key={item.id}
            className={styles.link}
          >
            <div key={item.id} className={styles.card}>
              <p
                style={{
                  fontSize: `${4 - item.title.length / 4}rem`,
                }}
              >
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
