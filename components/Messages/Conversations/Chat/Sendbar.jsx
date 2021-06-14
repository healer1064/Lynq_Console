// libraries
import React from "react";

// styles
import styles from "./styles.module.sass";

// icons
import { IoIosAttach } from "react-icons/io";

const Sendbar = () => {
  return (
    <div className={styles.send_bar}>
      <IoIosAttach />
      <input type="text" />
      <button>Send</button>
    </div>
  );
};

export default Sendbar;
