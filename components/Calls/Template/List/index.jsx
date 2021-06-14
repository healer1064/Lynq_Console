// libraries
import React from "react";

// styles
import styles from "./styles.module.sass";

// components
import Item from "./Item";

const index = ({ options, setOptions }) => {
  return (
    <div className={styles.list}>
      {options.map((item, index) => {
        return (
          <Item
            key={index}
            data={item}
            options={options}
            setOptions={setOptions}
          />
        );
      })}
    </div>
  );
};

export default index;
