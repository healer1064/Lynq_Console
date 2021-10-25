// libraries
import { useState, useEffect } from "react";

// styles
import styles from "./styles.module.sass";

// components
import EmptyData from "@/components/common/EmptyData";
import Head from "./Head";
import Item from "./Item";

const index = ({ list, refetchData, setData }) => {
  // states
  const [state, setState] = useState(list);

  useEffect(() => {
    setState(list);
  }, [list]);

  return state && state.length === 0 ? (
    <div className={styles.no_appointments}>
      <EmptyData title="No buttons to show" />
    </div>
  ) : (
    <div className={styles.list}>
      <Head />
      {state.map((item, index) => (
        <Item
          allItems={list}
          setData={setData}
          key={index}
          data={item}
          allItems={list}
          index={index}
          refetchData={refetchData}
        />
      ))}
    </div>
  );
};

export default index;
