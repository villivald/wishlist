"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import styles from "@/styles/Profile.module.css";

export default function Profile({ session }: { session: any }) {
  // User-level state
  const [userId, setUserId] = useState(""); //id
  const [avatar, setAvatar] = useState(""); //avatar

  // Wishlist-level state
  const [listName, setListName] = useState(""); //title
  const [listPicture, setListPicture] = useState(""); //image_url

  const handleSubmit = () => {
    fetch("/api/update/updateUserProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        avatar,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    fetch("/api/update/updateWishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        listName,
        listPicture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    const email = session?.user?.email;

    fetch("/api/get/getUserProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserId(data.id);
        setAvatar(data.avatar);
      });
  }, [session]);

  useEffect(() => {
    fetch("/api/get/getUsersWishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setListName(data.title);
        setListPicture(data.image_url);
      });
  }, [userId]);

  return (
    <div className={styles.container}>
      <h1>My Profile</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="listName">List Name</label>
          <input
            id="listName"
            name="listName"
            placeholder="My Wishlist"
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </section>
        <section>
          <label htmlFor="avatar">Profile Avatar</label>
          <input
            id="avatar"
            name="avatar"
            placeholder="https://www.apple.com/iphone.jpg"
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <Image
            className={styles.avatar}
            src={avatar || "/avatar.svg"}
            alt="Avatar of a ueser profile"
            width={30}
            height={30}
          />
        </section>
        <section>
          <label htmlFor="listPicture">List Image</label>
          <input
            id="listPicture"
            name="listPicture"
            placeholder="https://www.apple.com/iphone.jpg"
            type="text"
            value={listPicture}
            onChange={(e) => setListPicture(e.target.value)}
          />
          <div
            className={styles.card}
            style={{
              backgroundImage: listPicture ? `url(${listPicture})` : "",
            }}
          >
            <p style={{ fontSize: `${4 - listName.length / 4}rem` }}>
              {listName}
            </p>
          </div>
        </section>
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
}
