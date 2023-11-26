"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";

import Spinner from "@/components/spinner";
import LoadingDots from "@/components/loading-dots";

import { AppContext } from "../app/providers";

import styles from "@/styles/MyWishList.module.css";

export default function Wishlist({ session }: { session: any }) {
  const [itemProcessOngoing, setItemProcessOngoing] = useState(0);
  const [editMode, setEditMode] = useState(0);

  const { loading, setLoading } = useContext(AppContext);

  const [wishlistItems, setWishlistItems] = useState(
    [] as {
      id: number;
      title: string;
      price: string;
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
  }, [session, loading, setLoading]);

  const handleTurnOnEditMode = (id: number) => {
    setEditMode(id);
  };

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

  const handleUpdateItem = (
    id: number,
    title: string,
    price: string,
    url: string,
    description: string
  ) => {
    setEditMode(0);
    setItemProcessOngoing(id);

    fetch("/api/update/updateItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        price,
        url,
        description,
      }),
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
                  price: string;
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
                        <strong>Title:</strong>
                        {editMode === item.id ? (
                          <input
                            type="text"
                            defaultValue={item.title}
                            onChange={(e) => {
                              item.title = e.target.value;
                            }}
                          />
                        ) : (
                          <p>{item.title}</p>
                        )}
                      </div>
                      <div>
                        <strong>Price:</strong>
                        {editMode === item.id ? (
                          <input
                            type="text"
                            defaultValue={item.price}
                            onChange={(e) => {
                              item.price = e.target.value;
                            }}
                          />
                        ) : (
                          <p>
                            {item.price}
                            {item.price.includes("$") ||
                            item.price.includes("€")
                              ? ""
                              : "€"}
                          </p>
                        )}
                      </div>
                      <div>
                        <strong>Website:</strong>
                        {editMode === item.id ? (
                          <input
                            type="text"
                            defaultValue={item.url}
                            onChange={(e) => {
                              item.url = e.target.value;
                            }}
                          />
                        ) : (
                          <p>
                            <Link href={item.url} target="_blank">
                              Link
                            </Link>
                          </p>
                        )}
                      </div>
                      <details>
                        <summary>
                          <strong>Description</strong>
                        </summary>
                        {editMode === item.id ? (
                          <textarea
                            defaultValue={item.description}
                            onChange={(e) => {
                              item.description = e.target.value;
                            }}
                          />
                        ) : (
                          <p>{item.description}</p>
                        )}
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
                        <Image
                          src="/delete.svg"
                          alt="Delete icon - garbage can"
                          width={24}
                          height={24}
                        />
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
                        <Image
                          src="/check.svg"
                          alt="Check icon - checkmark"
                          width={24}
                          height={24}
                        />
                      </button>
                      {itemProcessOngoing === item.id ? (
                        <LoadingDots />
                      ) : editMode === item.id ? (
                        <button
                          data-id="save-button"
                          onClick={() =>
                            handleUpdateItem(
                              item.id,
                              item.title,
                              item.price,
                              item.url,
                              item.description
                            )
                          }
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          data-id="edit-button"
                          onClick={() => handleTurnOnEditMode(item.id)}
                        >
                          <Image
                            src="/edit.svg"
                            alt="Edit icon - pencil"
                            width={24}
                            height={24}
                          />
                        </button>
                      )}
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
                  price: string;
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
                        <strong>Price:</strong>
                        <p>
                          {item.price}
                          {item.price.includes("$") || item.price.includes("€")
                            ? ""
                            : "€"}
                        </p>
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
                        <Image
                          src="/delete.svg"
                          alt="Delete icon - garbage can"
                          width={24}
                          height={24}
                        />
                      </button>
                      <button
                        disabled={Boolean(itemProcessOngoing)}
                        onClick={() => handleMarkAsWanted(item.id)}
                      >
                        {itemProcessOngoing === item.id ? (
                          <LoadingDots />
                        ) : (
                          "Back to wishlist"
                        )}
                        <Image
                          className={styles.repeatButton}
                          src="/repeat.svg"
                          alt="Repeat icon - arrow"
                          width={24}
                          height={24}
                        />
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
