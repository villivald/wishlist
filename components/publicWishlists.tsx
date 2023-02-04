"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/PublicWishlists.module.css";
import Link from "next/link";

export default function PublicWishlists() {
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    fetch("/api/get/getWishlists")
      .then((res) => res.json())
      .then((data) => {
        setWishlists(data);
      });
  }, []);

  console.log(wishlists);

  return (
    <div className={styles.container}>
      <Link href="/protected">Link to own page</Link>
      <h1>Public Wishlists</h1>
      <div className={styles.wishlists}>
        {wishlists?.map(
          (item: { id: number; title: string; description: string }) => (
            <Link
              href={`/wishlist/${item.id}`}
              key={item.id}
              className={styles.link}
            >
              <div key={item.id} className={styles.card}>
                <div>
                  <p>ID:</p> <p>{item.id}</p>
                </div>
                <div>
                  <p>Title:</p> <p>{item.title}</p>
                </div>
                {/* <div>
                  <p>Description:</p> <p>{item.description}</p>
                </div> */}
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
