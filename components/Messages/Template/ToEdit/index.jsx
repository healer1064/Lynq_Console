// libraries
import React from "react";
import { Tooltip } from "antd";

// icons
import { BsExclamationCircleFill } from "react-icons/bs";

// styles
import styles from "./styles.module.sass";

const index = ({ setState }) => {
  return (
    <div className={styles.content}>
      <label>
        Max response time <span>2 days</span>
      </label>
      <label>
        Price <span>$20</span>
      </label>
      <label className={styles.listing}>
        <h6>
          Listing Price{" "}
          <Tooltip
            className={styles.tooltip}
            title="The price a customer pays to purchase the service and that
            includes Lynq's fees."
          >
            <BsExclamationCircleFill />
          </Tooltip>
        </h6>{" "}
        <span>$22</span>
      </label>
      <div className={styles.desc_box}>
        <label htmlFor="desc">Description</label>
        <textarea
          disabled
          id="desc"
          maxLength="300"
          value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          blanditiis libero totam odit eum vitae praesentium hic. Totam adipisci
          unde, dolores aspernatur quibusdam vel quis iste numquam, debitis
          incidunt aliquam!"
        ></textarea>
      </div>
      <button onClick={() => setState(0)}>Edit</button>
    </div>
  );
};

export default index;
