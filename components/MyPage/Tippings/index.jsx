// libraries
import React from "react";
import { Tooltip } from "antd";

// styles
import styles from "./styles.module.sass";

// icons
import { BsExclamationCircleFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";

// components
import Item from "./Item";

const index = ({ tippings, setTippings }) => {
  return (
    <div className={styles.tippings}>
      <label>
        Tippings amount(max 3)
      </label>
      {tippings.map((item, index) => {
        return (
          <Item
            key={index}
            index={index}
            setTippings={setTippings}
            tippings={tippings}
          />
        );
      })}
      {tippings.length == 3 ? (
        <p>You can type upto 3 tippings</p>
      ) : (
        <AiFillPlusCircle
          className={styles.add}
          onClick={() => setTippings([...tippings, ""])}
        />
      )}
    </div>
  );
};

export default index;
