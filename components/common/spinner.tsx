import styles from "@/styles/Spinner.module.css";

export default function Spinner({ size }: { size: string }) {
  return <div className={styles.loader} data-size={size}></div>;
}
