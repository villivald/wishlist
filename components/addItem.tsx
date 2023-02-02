"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddItem({ session }: { session: any }) {
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetch("/api/add/addItem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session?.user.email,
            // @ts-ignore
            // TODO: fix this
            name: e.currentTarget.name.value,
            price: parseFloat(e.currentTarget.price.value),
            url: e.currentTarget.url.value,
            image_url: e.currentTarget.image_url.value,
          }),
        }).then(async (res) => {
          if (res.status === 200) {
            toast.success("Item added!");
            setTimeout(() => {
              router.push("/protected");
            }, 2000);
          } else {
            toast.error(await res.text());
          }
        });

        //clear form
        // @ts-ignore
        e.currentTarget.name.value = "";
        e.currentTarget.price.value = "";
        e.currentTarget.url.value = "";
        e.currentTarget.image_url.value = "";
      }}
    >
      <div>
        <label htmlFor="name">name</label>
        <input id="name" name="name" />
      </div>
      <div>
        <label htmlFor="price">price</label>
        <input id="price" name="price" />
      </div>
      <div>
        <label htmlFor="url">url</label>
        <input id="url" name="url" />
      </div>
      <div>
        <label htmlFor="image_url">image url</label>
        <input id="image_url" name="image_url" />
      </div>
      <button type="submit">Add a wishlist item</button>
    </form>
  );
}
