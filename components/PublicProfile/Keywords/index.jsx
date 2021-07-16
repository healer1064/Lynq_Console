// libraries
import React from "react";
import { Tooltip } from "antd";

// styles
import styles from "./styles.module.sass";

// icons
import { BsExclamationCircleFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";

// components
import Item from "./Item";

const index = ({ keywords, setKeywords }) => {
  return (
    <div className={styles.keywords}>
      <label>
        Keywords{" "}
        <Tooltip
          className={styles.tooltip}
          title='Keywords help your followers to understand the type of  advice/expertise you can offer in the video call'
        >
          <BsExclamationCircleFill />
        </Tooltip>
      </label>
      {keywords.map((item, index) => {
        return (
          <Item
            key={index}
            index={index}
            setKeywords={setKeywords}
            keywords={keywords}
          />
        );
      })}
      {keywords.length == 6 ? (
        <p>You can type upto 6 keywords</p>
      ) : (
        <AiFillPlusCircle
          className={styles.add}
          onClick={() => setKeywords([...keywords, ""])}
        />
      )}
    </div>
  );
};

export default index;
