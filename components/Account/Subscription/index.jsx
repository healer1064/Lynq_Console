// libraries
import React from "react";

// styles
import styles from "./styles.module.sass";

const index = () => {
  return (
    <div className={styles.subscription}>
      <h3>Subscription</h3>
      <h6>Your Current Plan</h6>
      <p>EARLY BIRD with 10% commission added on top of your session price</p>
      <h6>Processing Fees On Payments</h6>
      <p>2.9%</p>
      <h6>Example On $10 Ticket</h6>
      <p>You will be paid $10 - $0.29 =$9.71</p>
    </div>
  );
};

export default index;
