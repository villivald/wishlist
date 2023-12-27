"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";

import styles from "@/styles/Profile.module.css";

export default function Profile({ session }: { session: any }) {
  // User-level state
  const [userId, setUserId] = useState(""); //id
  const [avatar, setAvatar] = useState(""); //avatar
  const [profileName, setProfileName] = useState(""); //email

  // Wishlist-level state
  const [listName, setListName] = useState(""); //title
  const [listPicture, setListPicture] = useState(""); //image_url

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(listName, profileName, avatar, listPicture);
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
        setProfileName(data.email);
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
          <label htmlFor="profileName">Profile Name</label>
          <input
            id="profileName"
            name="profileName"
            placeholder="John Doe"
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
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
          <Image src="/avatar.svg" alt="Logo" width={30} height={30} />
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
          <div className={styles.card}>
            <p style={{ fontSize: `${4 - listName.length / 4}rem` }}>
              {listName}
            </p>
          </div>
        </section>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
