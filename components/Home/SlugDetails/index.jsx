// libraries
import React from "react";

// styles
import styles from "./styles.module.sass";

const index = ({ slugData }) => {
  return (
    <span className={styles.slug_details}>
      <h4>Your Lynq url</h4>
      <h5>
        {slugData && slugData.slug
          ? `us.lynq.app/${slugData.slug}`
          : "You need to customize it in Public Profile"}
      </h5>
    </span>
  );
};

export default index;
