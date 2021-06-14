// styles
import styles from "./styles.module.sass";

// icons
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const Head = ({ order }) => {
  return (
    <div className={styles.head}>
      <p
        //   onClick={onOrderChange}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        Received{" "}
        {order ? (
          <CaretUpOutlined style={{ marginLeft: "30px" }} />
        ) : (
          <CaretDownOutlined style={{ marginLeft: "30px" }} />
        )}
      </p>
      <p>Event Name</p>
      <p>Type</p>
      <p>Email</p>
      <p>Status</p>
    </div>
  );
};

export default Head;
