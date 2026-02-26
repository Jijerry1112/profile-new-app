import { memo } from "react";
import styles from "../styles/card.module.css";

const Card = ({ name, title, image }) => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.top}>
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div style={{ height: "150px", background: "#eee" }}>
            No Image
          </div>
        )}
      </div>

      <div className={styles.bottom}>
        <p>{name}</p>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default memo(Card);