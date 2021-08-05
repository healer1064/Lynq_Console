// styles
import styles from "./styles.module.scss";

const Item = ({ name, number, image, percent, trend }) => {
  return (
    <div className={styles.item}>
      <div>
        <h5>{number}</h5>
        <h6>{name}</h6>
        <p>
          <span className={trend == "up" ? styles.green : styles.red}>
            {percent}
          </span>{" "}
          Since yesterday
        </p>
      </div>
      <img src={image} alt={name} />
    </div>
  );
};

export default Item;
