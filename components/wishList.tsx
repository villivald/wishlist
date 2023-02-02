"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/WishList.module.css";

export default function Wishlist({
  session,
}: {
  session: {
    user: {
      email: string;
    };
  };
}) {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const email = session?.user?.email;

    fetch("/api/get/getItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setWishlistItems(data);
      });
  }, [session]);

  return (
    <div>
      <h1>Wishlist</h1>
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
