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

const index = () => {
  // states
  const [loading, setLoading] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");

  const onChange = (checked) => {
    if (name.length > 0 && website.length > 0) {
      setIsOn(true);
    } else {
      toast.info("Please type name and website first.");
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
          checked={isOn}
          onChange={onChange}
          loading={loading}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.input_wrap}>
        <label>Website</label>
        <input
          type='text'
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
    </div>
  );
};

export default index;
