import Image from "next/image";
import { useState } from "react";

import styles from "@/styles/Rating.module.css";

export default function Rating({ editable }: { editable: boolean }) {
  const [rating, setRating] = useState(2);

  return (
    <div className={styles.rating}>
      {[...Array(5)].map((_, item) => (
        <div
          key={item}
          data-editable={editable}
          className={styles.star}
          onClick={() => (editable ? setRating(item) : null)}
        >
          {rating >= item ? (
            <Image src="/star.svg" alt="star" width={24} height={24} />
          ) : (
            <Image src="/star-empty.svg" alt="star" width={24} height={24} />
          )}
        </div>
      ))}
    </div>
  );
}
