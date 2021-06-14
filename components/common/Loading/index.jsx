// styles
import styles from "./styles.module.css";

const Loading = ({ color }) => {
  return (
    <div
      className={styles.loading}
      style={{
        background: color || "#7E88F4",
      }}
    >
      <div className={styles.dot_pulse} data-title=".dot-pulse">
        <div className={styles.stage}>
          <div className={styles.dot_pulse}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
