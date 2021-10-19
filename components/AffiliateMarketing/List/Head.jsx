// styles
import styles from './styles.module.sass';

const Head = () => {
  return (
    <div className={styles.head}>
      <p>Product</p>
      <p>Date of creation</p>
      <p>Number of clicks</p>
    </div>
  );
};

export default Head;
