import styles from "../styles/card.module.css";

const Card = ({ name, title, image, mode }) => {
  return (
    <div
      className={`${styles["profile-card"]} ${
        mode === "dark" ? styles.dark : styles.light
      }`}
    >
      <div className={styles.top}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.bottom}>
        <p>{name}</p>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Card;