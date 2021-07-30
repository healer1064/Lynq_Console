// styles
import styles from "./styles.module.sass";

// icons
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const Head = ({ order, setOrder }) => {
  return (
    <div className={styles.head}>
      <p>Title</p>
      <p>Status</p>
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
        Date{order == "date_desc" ? <CaretUpOutlined /> : <CaretDownOutlined />}
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
        Time before masterclass
        {order == "length_desc" ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </p>
      <p
        className={`${styles.cursor} ${
          order == "price_desc" || order == "price_asc" ? "" : styles.dull
        }`}
        onClick={() =>
          setOrder((prevState) =>
            prevState == "price_asc" ? "price_desc" : "price_asc",
          )
        }
      >
        Price
        {order == "price_desc" ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </p>
      <p
        className={`${styles.cursor} ${
          order == "attendees_desc" || order == "attendees_asc"
            ? ""
            : styles.dull
        }`}
        onClick={() =>
          setOrder((prevState) =>
            prevState == "attendees_asc" ? "attendees_desc" : "attendees_asc",
          )
        }
      >
        Attendees
        {order == "attendees_desc" ? (
          <CaretUpOutlined />
        ) : (
          <CaretDownOutlined />
        )}
      </p>
      <p
        className={`${styles.cursor} ${
          order == "revenue_desc" || order == "revenue_asc" ? "" : styles.dull
        }`}
        onClick={() =>
          setOrder((prevState) =>
            prevState == "revenue_asc" ? "revenue_desc" : "revenue_asc",
          )
        }
      >
        Total revenue
        {order == "revenue_desc" ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </p>
    </div>
  );
};

export default Head;
