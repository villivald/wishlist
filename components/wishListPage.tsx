"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/WishList.module.css";

export default function Wishlist({ slug }: { slug: string }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetch("/api/get/getWishlistItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: parseInt(slug),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setWishlistItems(data);
      });
  }, [slug]);

  return (
    <div>
      <h1>Wishlist number {slug}</h1>
      <div>
        {wishlistItems?.map(
          (item: {
            id: number;
            name: string;
            price: number;
            url: string;
            image_url: string;
          }) => (
            <div key={item.id} className={styles.card}>
              <div>
                Title: <p>{item.name}</p>
              </div>
              <div>
                Price: <p>{item.price}</p>
              </div>
              <div>
                Url: <p>{item.url}</p>
              </div>
              <div>
                Pic: <p>{item.image_url}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
