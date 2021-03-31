// styles
import styles from "../../styles/Loading.module.css";

const PublicScreenLoading = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        top: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(89.93deg, #8B1847 -24.64%, #D91765 117.58%)",
        zIndex: "100",
        borderRadius: "8px",
        margin: "0px",
        height: "100%",
        width: "100%",
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

export default PublicScreenLoading;
