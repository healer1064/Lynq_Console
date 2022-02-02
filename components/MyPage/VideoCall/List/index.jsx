// libraries
import React from "react";

// styles
import styles from "./styles.module.sass";

// helpers
import { sortCalendarList } from "@/utils/helpers";

import Item from "./Item";

const index = ({ list, refetchResponse }) => {
  return list.length === 0 ? (
    <div className={styles.list}><label>No appointment</label></div>
  ) : (
    <div className={styles.list}>
      <div className={styles.list_wrap}>
        {sortCalendarList(list).map((item, index) => {
          return (
            <Item data={item} key={index} refetchResponse={refetchResponse} />
          );
        })}
      </div>
    </div>
  );
};

export default index;
