// styles
import styles from "./styles.module.sass";

// icons
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const Head = ({ order, setOrder }) => {
  return (
    <div className={styles.head}>
      <p onClick={() => setOrder(!order)}>
        Received {order ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </p>
      <p>Event Name</p>
      <p>Type</p>
      <p>Email</p>
      <p>Status</p>
    </div>
  );
};

export default Head;
