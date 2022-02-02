// libraries
import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";

// styles
import styles from "./styles.module.sass";

// components
import Item from "./Item";

const index = ({ socialLinks, setSocialLinks }) => {
  return (
    <div className={styles.socialLinks}>
      
      {
        socialLinks.map((item, index) => {
          return (
            <Item
              key={index}
              index={index}
              setSocialLinks={setSocialLinks}
              socialLinks={socialLinks}
            />
          );
        })
      }
      {socialLinks.length == 6 ? (
        <p>You can type upto 6 socialLinks</p>
      ) : (
        <AiFillPlusCircle
          className={styles.add}
          onClick={() => setSocialLinks([...socialLinks, { type:0, url:"" }])}
        />
      )}
    </div>
  );
};

export default index;
