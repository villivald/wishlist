import AddItem from "@/components/addItem";
import SignOut from "@/components/sign-out";
import styles from "@/styles/Protected.module.css";
import AuthStatus from "@/components/auth-status";

export default async function Home() {
  const session = await AuthStatus();
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <AddItem session={session} />
        <SignOut />
      </div>
    </div>
  );
}
