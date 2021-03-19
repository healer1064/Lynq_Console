// styles
import styles from "../../../styles/Loading.module.css";

const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#7E88F4",
        zIndex: "100",
        borderRadius: "8px",
        margin: "0px",
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
