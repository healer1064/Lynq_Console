// libraries
import React from "react";
import moment from "moment";

// styles
import styles from "./styles.module.sass";

const Item = ({ selected }) => {
  return (
    <div className={styles.item}>
      <div className={styles.icon}>
        <span style={{ background: selected.color }}>
          {selected.recipient.match(/\b(\w)/g).join("")}
        </span>
      </div>
      <div className={styles.content}>
        <h6>{selected.recipient}</h6>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
          doloremque quod iste hic unde libero. Inventore ab tenetur repellat
          deleniti?
        </p>
      </div>
      <div className={styles.time}>
        <h6>{moment().format("hh:mm a")}</h6>
        <p>2 min ago</p>
      </div>
    </div>
  );
};

export default Item;
