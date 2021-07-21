// styles
import styles from "./styles.module.sass";

// icons
// import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const Head = ({ order }) => {
  return (
    <div className={styles.head}>
      <p
      //   onClick={onOrderChange}
      // style={{
      //   display: "flex",
      //   alignItems: "center",
      //   cursor: "pointer",
      // }}
      >
        Title
        {/* {order ? (
          <CaretUpOutlined style={{ marginLeft: "30px" }} />
        ) : (
          <CaretDownOutlined style={{ marginLeft: "30px" }} />
        )} */}
      </p>
      <p>Status</p>
      <p>Date</p>
      <p>Time before masterclass</p>
      <p>Price</p>
      <p>Attendees</p>
      <p>Total revenue</p>
    </div>
  );
};

export default Head;
