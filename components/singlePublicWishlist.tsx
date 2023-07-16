"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Spinner from "@/components/spinner";

import styles from "@/styles/SinglePublicWishlist.module.css";

export default function Wishlist({ slug }: { slug: string }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlists, setWishlists] = useState(
    [] as {
      id: number;
      title: string;
    }[]
  );

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    fetch("/api/get/getWishlists")
      .then((res) => res.json())
      .then((data) => {
        setWishlists(data);
      });
  }, []);

  const currentWishlist = wishlists.filter(
    (item: { id: number; title: string }) => item.id === parseInt(slug)
  );

  return (
    <div className={styles.container}>
      <h1>{currentWishlist[0]?.title}</h1>
      {loading ? (
        <Spinner size="large" />
      ) : (
        <div className={styles.cards}>
          {wishlistItems
            ?.filter((item: { ready: boolean }) => !item.ready)
            .map(
              (item: {
                id: number;
                title: string;
                price: number;
                url: string;
                image_url: string;
                description: string;
              }) => (
                <div key={item.id} className={styles.card}>
                  <Link href={item.image_url} passHref target="_blank">
                    <Image
                      src={
                        item.image_url.substring(0, 4) === "http"
                          ? item.image_url
                          : "https://" + item.image_url
                      }
                      width={200}
                      height={200}
                      alt="Picture of the wishlist item"
                    />
                  </Link>
                  <div>
                    <p>Title:</p> <p>{item.title}</p>
                  </div>
                  <div>
                    <p>Price:</p> <p>{item.price}€</p>
                  </div>
                  <div>
                    <p>Website:</p>{" "}
                    <p>
                      <Link href={item.url} passHref target="_blank">
                        Link
                      </Link>
                    </p>
                  </div>
                  <details>
                    <summary>Description</summary>
                    <p>{item.description}</p>
                  </details>
                </div>
              )
            )}
        </div>
      )}
    </div>
  );
}
