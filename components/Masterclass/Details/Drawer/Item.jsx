// styles
import styles from "./styles.module.sass";

const Item = ({ data, index }) => {
  // data
  const { firstname, lastname, email } = data;

  return (
    <div className={styles.body}>
      <p>{index + 1}</p>
      <p>{firstname}</p>
      <p>{lastname}</p>
      <p>{email}</p>
    </div>
  );
};

export default Item;
