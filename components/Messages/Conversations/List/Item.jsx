// libraries
import { useState, useEffect } from "react";
import moment from "moment";

// styles
import styles from "./styles.module.sass";

const Item = ({ data, setRecipient }) => {
  // states
  const [color, setColor] = useState();

  // get color
  useEffect(() => {
    setColor(
      `rgb(${Math.floor(Math.random() * 151)}, ${Math.floor(
        Math.random() * 101
      )}, ${Math.floor(Math.random() * 101)})`
    );
  }, []);

  // handle click
  const onClick = (item, color) => {
    setRecipient({ ...item, color });
  };

  return (
    <div className={styles.item} onClick={() => onClick(data, color)}>
      <span
        style={{
          background: color,
        }}
      >
        {`${data.customerFirstName} ${data.customerLastName}`
          .match(/\b(\w)/g)
          .join("")}
      </span>
      <p>{`${data.customerFirstName} ${data.customerLastName}`}</p>
      <h6>
        {moment(
          data.content.length > 0
            ? data.content.sort((a, b) => {
                return new Date(b.sentDate) - new Date(a.sentDate);
              })[0].sentDate
            : data.requestDate
        ).format("MM/DD/yyyy")}
      </h6>
    </div>
  );
};

export default Item;
