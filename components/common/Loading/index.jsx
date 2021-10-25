// styles
import styles from "./styles.module.scss";

const Loading = ({ color }) => {
  return (
    <div className={styles.box}>
      <div class={styles.container}>
        <span class={styles.circle}></span>
        <span class={styles.circle}></span>
        <span class={styles.circle}></span>
        <span class={styles.circle}></span>
      </div>
    </div>
  );
};

export default Loading;
