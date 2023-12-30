"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Spinner from "@/components/common/spinner";

import styles from "@/styles/PublicWishlists.module.css";

export default function PublicWishlists() {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/get/getWishlists")
      .then((res) => res.json())
      .then((data) => {
        setWishlists(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Public Wishlists</h1>
      {loading ? (
        <Spinner size="large" />
      ) : (
        <div className={styles.wishlists}>
          {wishlists?.map(
            (item: { id: number; title: string; image_url: string }) => (
              console.log(item),
              (
                <Link
                  href={`/wishlist/${item.id}`}
                  key={item.id}
                  className={styles.link}
                >
                  <div
                    key={item.id}
                    className={styles.card}
                    style={{
                      backgroundImage: item.image_url
                        ? `url(${item.image_url})`
                        : "",
                    }}
                  >
                    <p style={{ fontSize: `${4 - item.title.length / 4}rem` }}>
                      {item.title}
                    </p>
                  </div>
                </Link>
              )
            )
          )}
        </div>
      )}
    </div>
  );
}
