// styles
import styles from "./styles.module.sass";

const Item = ({ data, index }) => {
  return (
    <div className={styles.body}>
      <p>{index + 1}</p>
      <p>Test</p>
      <p>Name</p>
      <p>test@name.com</p>
    </div>
  );
};

export default Item;
