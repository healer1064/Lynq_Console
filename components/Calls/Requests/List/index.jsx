// libraries
import { useState, useEffect } from "react";

// styles
import styles from "./styles.module.sass";

// components
import EmptyData from "@/components/common/EmptyData";
import Head from "./Head";
import Item from "./Item";

const index = ({ list, filter }) => {
  // states
  const [data, setData] = useState(list);
  const [order, setOrder] = useState(false);

  useEffect(() => {
    if (filter == "All") {
      setData(list);
    } else if (filter == "To Validate") {
      const arr = list.filter(
        (item) => new Date(item.starting_date) > new Date()
      );
      setData(arr);
    } else if (filter == "Expired") {
      setData(list.filter((item) => new Date(item.ending_date) < new Date()));
    }
  }, [list, filter]);

  return data && data.length === 0 ? (
    <div className={styles.no_appointments}>
      <EmptyData title="No requests to show" />
    </div>
  ) : (
    <div className={styles.list}>
      <Head order={order} setOrder={setOrder} />
      {data
        .sort(function (a, b) {
          var dateA = new Date(a.create_date || a.requestDate),
            dateB = new Date(b.create_date || b.requestDate);
          if (order) {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        })
        .map((item, index) => (
          <Item key={index} data={item} />
        ))}
    </div>
  );
};

export default index;
