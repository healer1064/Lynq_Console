// libraries
import React from "react";
import Fade from "react-reveal/Fade";

// styles
import styles from "./styles.module.sass";

// components
import Request from "../Request";
import History from "../History";

const index = ({ payments, toggleResponse }) => {
  return (
    <Fade>
      <div className={styles.payment}>
        <Request data={payments} toggleResponse={toggleResponse} />
        <History data={payments.transfer_history} />
      </div>
    </Fade>
  );
};

export default index;
