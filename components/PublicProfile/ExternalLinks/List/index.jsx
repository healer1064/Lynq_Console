// libraries
import { useState, useEffect } from "react";

// styles
import styles from "./styles.module.sass";

// components
import EmptyData from "@/components/common/EmptyData";
import Head from "./Head";
import Item from "./Item";

const index = ({ list, refetchData }) => {
  // states
  const [data, setData] = useState(list);

  useEffect(() => {
    setData(list);
  }, [list]);

  return data && data.length === 0 ? (
    <div className={styles.no_appointments}>
      <EmptyData title="No buttons to show" />
    </div>
  ) : (
    <div className={styles.list}>
      <Head />
      {data.map((item, index) => (
        <Item key={index} data={item} index={index} refetchData={refetchData} />
      ))}
    </div>
  );
};

export default index;
