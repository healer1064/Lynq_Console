// libraries
import ReactTooltip from "react-tooltip";

// styles
import styles from "./styles.module.sass";

const Item = ({ data }) => {
  const {
    first_name,
    last_name,
    email,
    starting_date,
    display_price: price,
  } = data;

  return (
    <div className={styles.row}>
      <ReactTooltip />
      <div className={`${styles.col} ${styles.first_name}`}>
        <span>{first_name}</span>
      </div>
      <div className={`${styles.col} ${styles.last_name}`}>
        <span>{last_name}</span>
      </div>
      <div className={`${styles.col} ${styles.email}`}>
        <span data-tip={email}>{email}</span>
      </div>
      <div className={`${styles.col} ${styles.session}`}>
        <span>{starting_date.split("T")[0]}</span>
      </div>
      <div className={`${styles.col} ${styles.revenue}`}>
        <strong>${price || "0"}</strong>
      </div>
    </div>
  );
};

export default Item;
