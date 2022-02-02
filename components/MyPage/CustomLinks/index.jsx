// libraries
import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";

// styles
import styles from "./styles.module.sass";

// components
import Item from "./Item";

const index = ({ customLinks, setCustomLinks }) => {
  return (
    <div className={styles.customLinks}>
      
      {
        customLinks.map((item, index) => {
          return (
            <Item
              key={index}
              index={index}
              setCustomLinks={setCustomLinks}
              customLinks={customLinks}
            />
          );
        })
      }
      {customLinks.length == 6 ? (
        <p>You can type upto 6 customLinks</p>
      ) : (
        <AiFillPlusCircle
          className={styles.add}
          onClick={() => setCustomLinks([...customLinks, { title:"", url:"" }])}
        />
      )}
    </div>
  );
};

export default index;
