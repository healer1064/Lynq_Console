// libraries
import React from "react";

// styles
import styles from "./styles.module.sass";

// components
import Form from "../Form";

const index = () => {
  return (
    <div className={styles.content}>
      <h2>New Masterclass</h2>
      <Form />
    </div>
  );
};

export default index;
