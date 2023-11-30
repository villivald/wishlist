import styles from "@/styles/LoadingDots.module.css";

export default function LoadingDots() {
  return (
    <span className={styles.loading}>
      <span />
      <span />
      <span />
    </span>
  );
}
