import styles from "@/styles/FloatingButton.module.css";

export default function FloatingButton() {
  return (
    <div className={styles.container}>
      <a href="#addItemForm">
        <button className={styles.floatingButton}>Add new item</button>
      </a>
    </div>
  );
}
