"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/WishList.module.css";
import Link from "next/link";

export default function Wishlist({ session }: { session: any }) {
  const [wishlistItems, setWishlistItems] = useState(
    [] as {
      id: number;
      title: string;
      price: number;
      url: string;
      image_url: string;
      description: string;
    }[]
  );

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

  const handleDelete = (id: number) => {
    console.log(id);
    fetch("/api/delete/deleteItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then((res) => {
      if (res.status === 200) {
        setWishlistItems(wishlistItems.filter((item) => item.id !== id));
      }
    });
  };

  return (
    <div>
      <Link href="/publicWishlists">Link to public wishlists</Link>
      <h1>My Wishlist</h1>
      <div>
        {wishlistItems?.map(
          (item: {
            id: number;
            title: string;
            price: number;
            url: string;
            image_url: string;
            description: string;
          }) => (
            <div key={item.id} className={styles.card}>
              <div>
                Title: <p>{item.title}</p>
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
              <div>
                Description: <p>{item.description}</p>
              </div>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
