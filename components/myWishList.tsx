"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import Spinner from "@/components/spinner";
import LoadingDots from "@/components/loading-dots";

import styles from "@/styles/MyWishList.module.css";

export default function Wishlist({ session }: { session: any }) {
  const [loading, setLoading] = useState(true);
  const [itemProcessOngoing, setItemProcessOngoing] = useState(0);

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
    setItemProcessOngoing(id);
    fetch("/api/delete/deleteItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then((res) => {
      if (res.status === 200) {
        setItemProcessOngoing(0);
        setWishlistItems(wishlistItems.filter((item) => item.id !== id));
      }
    });
  };

  const handleMarkAsReady = (id: number) => {
    setItemProcessOngoing(id);
    fetch("/api/update/markAsReady", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItemProcessOngoing(0);
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
    setItemProcessOngoing(id);
    fetch("/api/update/markAsWanted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItemProcessOngoing(0);
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
                      <button
                        disabled={Boolean(itemProcessOngoing)}
                        onClick={() => handleDelete(item.id)}
                      >
                        {itemProcessOngoing === item.id ? (
                          <LoadingDots />
                        ) : (
                          "Delete"
                        )}
                      </button>
                      <button
                        disabled={Boolean(itemProcessOngoing)}
                        onClick={() => handleMarkAsReady(item.id)}
                      >
                        {itemProcessOngoing === item.id ? (
                          <LoadingDots />
                        ) : (
                          "Mark as ready"
                        )}
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
                      <button
                        disabled={Boolean(itemProcessOngoing)}
                        onClick={() => handleMarkAsWanted(item.id)}
                      >
                        {itemProcessOngoing === item.id ? (
                          <LoadingDots />
                        ) : (
                          "Mark as wanted"
                        )}
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
