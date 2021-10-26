// libraries
import React, { useState } from "react";
import { Switch } from "antd";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.scss";

// icons
import { BsExclamationCircleFill } from "react-icons/bs";

// components
import { Tooltip } from "antd";
import Loading from "@/components/common/Loading";

const index = ({
  charity,
  setCharity,
  charityName,
  setCharityName,
  loading,
  onSubmit,
}) => {
  const onChange = (checked) => {
    if (charityName.length > 0) {
      setCharity(checked);
    } else {
      toast.info("Please type charity name first");
    }
  };

  return (
    <div className={styles.charity}>
      <div className={styles.head}>
        <h6>
          Support a charity{" "}
          <Tooltip
            className={styles.tooltip}
            title='By using this option, you let people know on your public profile
                    that you donate earnings to the charity of your choice.
                    You remain fully responsible to make the donation once you get
                    paid by Lynq'
          >
            <BsExclamationCircleFill />
          </Tooltip>
        </h6>
        <Switch
          checked={charity}
          onChange={onChange}
          style={{
            borderRadius: "50px",
            padding: "0",
            margin: "0",
            backgroundColor: "rgba(0, 0, 0, 0.25)",
          }}
        />
      </div>
      <div className={styles.input_wrap}>
        <label>Name of the charity</label>
        <input
          type='text'
          value={charityName}
          onChange={(e) => setCharityName(e.target.value)}
        />
      </div>
      <div className={styles.text_uppercase}>
        <button onClick={(e) => onSubmit(e)} style={{ position: "relative" }}>
          {loading && <Loading />}Save
        </button>
      </div>
      {/* <div className={styles.input_wrap}>
        <label>Website</label>
        <input
          type='text'
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div> */}
    </div>
  );
};

export default index;
