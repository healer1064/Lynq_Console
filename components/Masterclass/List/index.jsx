// libraries
import React from "react";

// styles
import styles from "./styles.module.sass";

// components
import EmptyData from "@/components/common/EmptyData";
import Head from "./Head";
import Item from "./Item";

const index = ({ list }) => {
  console.log(list);
  return list.length === 0 ? (
    <div className={styles.no_appointments}>
      <EmptyData title='No masterclasses to show' />
    </div>
  ) : (
    <div className={styles.list}>
      <Head />
      {list
        .sort(function (a, b) {
          var dateA = new Date(a.date),
            dateB = new Date(b.date);
          // if (order) {
          return dateA - dateB;
          // } else {
          //   return dateB - dateA;
          // }
        })
        .map((item, index) => (
          <Item key={index} data={item} />
        ))}
    </div>
  );
};

export default index;
