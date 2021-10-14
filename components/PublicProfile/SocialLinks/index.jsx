// libraries
import React from "react";

// styles
import styles from "./styles.module.sass";

// icons
import { AiFillPlusCircle } from "react-icons/ai";

// components
import Item from "./Item";

const index = ({ socialLinks, setSocialLinks }) => {
  return (
    <div className={styles.social_links}>
      {socialLinks.map((item, index) => {
        return (
          <Item
            key={index}
            index={index}
            setSocialLinks={setSocialLinks}
            socialLinks={socialLinks}
          />
        );
      })}
      {socialLinks.length < 10 && (
        <AiFillPlusCircle
          className={styles.add}
          onClick={() => setSocialLinks([...socialLinks, ""])}
        />
      )}
    </div>
  );
};

export default index;
