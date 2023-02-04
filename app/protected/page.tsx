import AddItem from "@/components/addItem";
import AuthStatus from "@/components/auth-status";
import Wishlist from "@/components/wishList";
import styles from "@/styles/Protected.module.css";

export default async function Home() {
  const session = await AuthStatus();

  return (
    <div className={styles.container}>
      <Wishlist session={session} />
      <div className={styles.card}>
        <AddItem session={session} />
      </div>
    </div>
  );
}
