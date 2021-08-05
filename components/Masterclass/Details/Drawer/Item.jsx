// styles
import styles from "./styles.module.sass";

// components
import ReactTooltip from "react-tooltip";

const Item = ({ data, index }) => {
  // data
  const { firstname, lastname, email } = data;

  return (
    <div className={styles.body}>
      <ReactTooltip />
      <p>{index + 1}</p>
      <p data-tip={firstname}>{firstname}</p>
      <p data-tip={lastname}>{lastname}</p>
      <p data-tip={email}>{email}</p>
    </div>
  );
};

export default Item;
