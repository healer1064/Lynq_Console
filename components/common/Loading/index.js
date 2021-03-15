import React from "react";

import styles from "../../../styles/Loading.module.css";

const Loading = () => {
  return (
    <div class={styles.dot_pulse} data-title=".dot-pulse">
      <div class={styles.stage}>
        <div class={styles.dot_pulse}></div>
      </div>
    </div>
  );
};

export default Loading;
