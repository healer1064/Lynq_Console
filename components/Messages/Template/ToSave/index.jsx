// libraries
import React from "react";

// styles
import styles from "./styles.module.sass";

// icons

const index = ({ setState }) => {
  return (
    <div className={styles.content}>
      <label>
        Max Hours{" "}
        <span>
          <input />
        </span>
      </label>
      <label>
        Price{" "}
        <span>
          <img src="/img/dollar.svg" alt="dollar" />
          <input />
        </span>
      </label>
      <button onClick={() => setState(1)}>Save</button>
    </div>
  );
};

export default index;
