"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import Spinner from "@/components/spinner";

import styles from "@/styles/MyWishList.module.css";

export default function Wishlist({ session }: { session: any }) {
  const [loading, setLoading] = useState(true);

  const [wishlistItems, setWishlistItems] = useState(
    [] as {
      id: number;
      title: string;
      price: number;
      url: string;
      image_url: string;
      description: string;
      ready: boolean;
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
        setLoading(false);
      });
  }, [session]);

  const handleDelete = (id: number) => {
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

  const handleMarkAsReady = (id: number) => {
    fetch("/api/update/markAsReady", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setWishlistItems(
          wishlistItems.map((item) => {
            if (item.id === id) {
              return data;
            } else {
              return item;
            }
          })
        );
      });
  };

  const handleMarkAsWanted = (id: number) => {
    fetch("/api/update/markAsWanted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setWishlistItems(
          wishlistItems.map((item) => {
            if (item.id === id) {
              return data;
            } else {
              return item;
            }
          })
        );
      });
  };

  return (
    <div className={styles.container}>
      <h1>My Wishlist</h1>
      {loading ? (
        <Spinner size="large" />
      ) : (
        <>
          <div className={styles.cards}>
            {wishlistItems
              ?.filter((item) => !item.ready)
              .map(
                (item: {
                  id: number;
                  title: string;
                  price: number;
                  url: string;
                  image_url: string;
                  description: string;
                  ready: boolean;
                }) => (
                  <div key={item.id} className={styles.card}>
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      width={200}
                      height={200}
                    />
                    <div>
                      <div>
                        <strong>Title:</strong> <p>{item.title}</p>
                      </div>
                      <div>
                        <strong>Price:</strong> <p>{item.price}€</p>
                      </div>
                      <div>
                        <strong>Website:</strong>
                        <p>
                          <Link href={item.url} target="_blank">
                            Link
                          </Link>
                        </p>
                      </div>
                      <details>
                        <summary>
                          <strong>Description</strong>
                        </summary>
                        <p>{item.description}</p>
                      </details>
                    </div>
                    <div>
                      <button onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                      <button onClick={() => handleMarkAsReady(item.id)}>
                        Mark as ready
                      </button>
                    </div>
                  </div>
                )
              )}
          </div>
          <h1>Ready</h1>
          <div className={styles.cards}>
            {wishlistItems
              ?.filter((item) => item.ready)
              .map(
                (item: {
                  id: number;
                  title: string;
                  price: number;
                  url: string;
                  image_url: string;
                  description: string;
                  ready: boolean;
                }) => (
                  <div key={item.id} className={styles.card}>
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      width={200}
                      height={200}
                    />
                    <div>
                      <div>
                        <strong>Title:</strong> <p>{item.title}</p>
                      </div>
                      <div>
                        <strong>Price:</strong> <p>{item.price}€</p>
                      </div>
                      <div>
                        <strong>Website:</strong>
                        <p>
                          <Link href={item.url} target="_blank">
                            Link
                          </Link>
                        </p>
                      </div>
                      <details>
                        <summary>
                          <strong>Description</strong>
                        </summary>
                        <p>{item.description}</p>
                      </details>
                    </div>
                    <div>
                      <button onClick={() => handleMarkAsWanted(item.id)}>
                        Put back on wishlist
                      </button>
                    </div>
                  </div>
                )
              )}
          </div>
        </>
      )}
    </div>
  );
}
