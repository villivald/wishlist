import Image from "next/image";

import styles from "@/styles/Rating.module.css";

export default function Rating({
  editable,
  rating,
  setRating,
}: {
  editable: boolean;
  rating: number;
  setRating: (rating: number) => void;
}) {
  return (
    <div className={styles.rating}>
      {[...Array(5)].map((_, item) => (
        <div
          key={item}
          data-editable={editable}
          className={styles.star}
          onClick={() => (editable ? setRating(item + 1) : null)}
        >
          {rating >= item + 1 ? (
            <Image src="/star.svg" alt="star" width={24} height={24} />
          ) : (
            <Image src="/star-empty.svg" alt="star" width={24} height={24} />
          )}
        </div>
      ))}
    </div>
  );
}
