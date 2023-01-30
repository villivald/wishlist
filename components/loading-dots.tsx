import styles from "@/styles/LoadingDots.module.css";

const LoadingDots = () => {
  return (
    <span className={styles.loading}>
      <span />
      <span />
      <span />
    </span>
  );
};

export default LoadingDots;
