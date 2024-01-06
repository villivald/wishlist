"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import LoadingDots from "@/components/common/loading-dots";

import { AppContext } from "../app/providers";

import styles from "@/styles/AddItem.module.css";

export default function AddItem({ session }: { session: any }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const { loading, setLoading } = useContext(AppContext);

  const isDisabled = () => {
    return !title || !price || !url || !image_url;
  };

  return (
    <form
      id="addItemForm"
      className={styles.form}
      onSubmit={(e) => {
        setLoading(true);
        e.preventDefault();
        fetch("/api/add/addItem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session?.user.email,
            title: title,
            price: price,
            url: url,
            image_url: image_url,
            description: description,
          }),
        }).then(async (res) => {
          if (res.status === 200) {
            setLoading(false);
            toast.success("Item added!");
            router.push("/mywishlist");
          } else {
            setLoading(false);
            toast.error(await res.text());
          }
        });

        //clear form
        setTitle("");
        setPrice("");
        setUrl("");
        setImageUrl("");
        setDescription("");
      }}
    >
      <h1>Add a new item</h1>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          placeholder="iPhone Pro 17"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          placeholder="1000€"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">URL</label>
        <input
          id="url"
          name="url"
          placeholder="https://www.apple.com"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="image_url">Image URL</label>
        <input
          id="image_url"
          name="image_url"
          type="text"
          placeholder="https://www.apple.com/iphone.jpg"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <p className={styles.tooltip}>
          <span>
            ℹ️{" "}
            <span>
              Image link must end with file extension - .jpg, .png, .webp, etc.
            </span>
          </span>
          <span>
            Use{" "}
            <a href="https://img.doerig.dev/" target="_blank" rel="noreferrer">
              img.doerig.dev
            </a>{" "}
            for uploading if needed.
          </span>
        </p>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="I want this because..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        disabled={isDisabled()}
        type="submit"
        className={isDisabled() ? styles.disabledButton : styles.button}
      >
        {loading ? <LoadingDots /> : "Add"}
      </button>
    </form>
  );
}
