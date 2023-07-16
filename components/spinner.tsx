import styles from "@/styles/Spinner.module.css";

const Spinner = ({ size }: { size: string }) => {
  return <div className={styles.loader} data-size={size}></div>;
};

export default Spinner;
