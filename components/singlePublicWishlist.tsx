"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Spinner from "@/components/common/spinner";
import Rating from "@/components/common/rating";

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

  const checkImageUrl = (url: string) => {
    return (
      url.match(/\.(jpeg|jpg|gif|png|webp|avif)/) &&
      (url.match(/^https:\/\//) || url.match(/^http:\/\//))
    );
  };

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
                price: string;
                url: string;
                image_url: string;
                description: string;
                rating: number;
              }) => (
                <div key={item.id} className={styles.card}>
                  <Link href={item.image_url} passHref target="_blank">
                    <Image
                      src={
                        checkImageUrl(item.image_url)
                          ? item.image_url
                          : "/no-image.svg"
                      }
                      width={200}
                      height={200}
                      alt="Picture of the wishlist item"
                    />
                  </Link>
                  <div>
                    <div>
                      <strong>Title:</strong> <p>{item.title}</p>
                    </div>
                    <div>
                      <strong>Price:</strong> <p>{item.price}€</p>
                    </div>
                    <div>
                      <p>
                        <strong>Website:</strong>
                      </p>
                      <p>
                        <Link href={item.url} passHref target="_blank">
                          Link
                        </Link>
                      </p>
                    </div>
                    <Rating
                      editable={false}
                      rating={item.rating}
                      setRating={() => {}}
                    />
                    <details>
                      <summary>
                        <strong>Description</strong>
                      </summary>
                      <p>{item.description}</p>
                    </details>
                  </div>
                </div>
              )
            )}
        </div>
      )}
    </div>
  );
}
