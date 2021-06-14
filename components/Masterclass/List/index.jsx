// libraries
import { useState } from "react";

// styles
import styles from "./styles.module.sass";

// components
import EmptyData from "@/components/common/EmptyData";
import Head from "./Head";
import Item from "./Item";

const index = () => {
  // states
  const [list, setList] = useState([1, 2]);

  return list.length === 0 ? (
    <div className={styles.no_appointments}>
      <EmptyData title="No requests to show" />
    </div>
  ) : (
    <div className={styles.list}>
      <Head />
      {list
        // .sort(function (a, b) {
        //   var dateA = new Date(a.create_date || a.requestDate),
        //     dateB = new Date(b.create_date || b.requestDate);
        //   if (order) {
        //     return dateA - dateB;
        //   } else {
        //     return dateB - dateA;
        //   }
        // })
        .map((item, index) => (
          <Item key={index} data={item} />
        ))}
    </div>
  );
};

export default index;
