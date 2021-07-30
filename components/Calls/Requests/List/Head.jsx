// styles
import styles from "./styles.module.sass";

// icons
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const Head = ({ order, setOrder }) => {
  return (
    <div className={styles.head}>
      <p
        className={`${styles.cursor} ${
          order == "received_desc" || order == "received_asc" ? "" : styles.dull
        }`}
        onClick={() =>
          setOrder((prevState) =>
            prevState == "received_asc" ? "received_desc" : "received_asc",
          )
        }
      >
        Received
        {order == "received_desc" ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </p>
      <p
        className={`${styles.cursor} ${
          order == "length_desc" || order == "length_asc" ? "" : styles.dull
        }`}
        onClick={() =>
          setOrder((prevState) =>
            prevState == "length_asc" ? "length_desc" : "length_asc",
          )
        }
      >
        Session length
        {order == "length_desc" ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </p>
      <p
        className={`${styles.cursor} ${
          order == "date_desc" || order == "date_asc" ? "" : styles.dull
        }`}
        onClick={() =>
          setOrder((prevState) =>
            prevState == "date_asc" ? "date_desc" : "date_asc",
          )
        }
      >
        Session date
        {order == "date_desc" ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </p>
      <p>Email</p>
      <p
        className={`${styles.cursor} ${
          order == "status_desc" || order == "status_asc" ? "" : styles.dull
        }`}
        onClick={() =>
          setOrder((prevState) =>
            prevState == "status_asc" ? "status_desc" : "status_asc",
          )
        }
      >
        Status
        {order == "status_desc" ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </p>
    </div>
  );
};

export default Head;
