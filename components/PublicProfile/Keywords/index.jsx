// libraries
import React from "react";
import { Tooltip } from "antd";

// styles
import styles from "./styles.module.sass";

// icons
import { BsExclamationCircleFill } from "react-icons/bs";

const index = ({ keywords, setKeywords }) => {
  return (
    <div className={styles.keywords}>
      <label>
        Keywords{" "}
        <Tooltip
          className={styles.tooltip}
          title="Keywords help your followers to understand the type of  advice/expertise you can offer in the video call"
        >
          <BsExclamationCircleFill />
        </Tooltip>
      </label>
      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
    </div>
  );
};

export default index;
