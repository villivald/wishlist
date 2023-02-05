import AddItem from "@/components/addItem";
import AuthStatus from "@/components/auth-status";
import MyWishlist from "@/components/myWishList";
import styles from "@/styles/Protected.module.css";

export default async function Home() {
  const session = await AuthStatus();

  return (
    <div className={styles.container}>
      <MyWishlist session={session} />
      <div className={styles.card}>
        <AddItem session={session} />
      </div>
    </div>
  );
}
