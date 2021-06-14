// libraries
import React from "react";

// styles
import styles from "./styles.module.sass";

const index = ({ setState }) => {
  return (
    <div className={styles.content}>
      <label>
        Max Hours <span>48 hours</span>
      </label>
      <label>
        Price <span>$20</span>
      </label>
      <button onClick={() => setState(0)}>Edit</button>
    </div>
  );
};

export default index;
