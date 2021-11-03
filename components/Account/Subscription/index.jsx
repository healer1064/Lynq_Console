// libraries
import React from "react";

// styles
import styles from "./styles.module.sass";

const index = () => {
  return (
    <div className={styles.subscription}>
      <h3>Subscription</h3>
      <h6>Your Current Plan</h6>
      <p>EARLY BIRD with 15% commission added on top of your price</p>
      <h6>Processing Fees On Payments</h6>
      <p>2.9%</p>
    </div>
  );
};

export default index;
