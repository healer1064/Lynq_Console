// libraries
import React from "react";

// styles
import styles from "./styles.module.sass";

// components
import Item from "./Item";
import EmptyData from "@/components/common/EmptyData";

const PaymentsDetails = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.table}>
      <div className={`${styles.row} ${styles.head}`}>
        <div className={`${styles.col} ${styles.first_name}`}>
          <strong>Type</strong>
        </div>
        <div className={`${styles.col} ${styles.last_name}`}>
          <strong>Client's Email</strong>
        </div>
        <div className={`${styles.col} ${styles.email}`}>
          <strong>Price</strong>
        </div>
        <div className={`${styles.col} ${styles.session}`}>
          <strong>Session Date</strong>
        </div>
        <div className={`${styles.col} ${styles.status}`}>
          <strong>Status</strong>
        </div>
      </div>
      {data.length === 0 ? (
        <EmptyData title='No items to show.' flag='payment' />
      ) : (
        data.map((item, i) => {
          return <Item data={item} key={i} />;
        })
      )}
    </div>
  );
};

export default PaymentsDetails;
