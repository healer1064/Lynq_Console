// libraries
import React, { useState, useEffect } from "react";

// styles
import styles from "./styles.module.scss";

// helpers
import { hhmmss } from "@/utils/helpers";

// components
import { Radio } from "antd";
import { Switch } from "antd";

const index = ({ file }) => {
  // states
  const [value, setValue] = useState(1);
  const [duration, setDuration] = useState("");

  // handle radio change
  const onRadioChange = (e) => {
    setValue(e.target.value);
  };

  // handle switch change
  const onSwitchChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  useEffect(() => {
    var vid = document.createElement("video");
    vid.src = file.url;
    vid.ondurationchange = function () {
      setDuration(this.duration);
    };
  }, []);

  return (
    <div className={styles.video}>
      <h6>
        Video length: <span>{hhmmss(duration)}</span>
      </h6>
      <h5>Preview</h5>
      <img
        src='https://www.learntotrade.com.ph/assets-lttph/uploads/2016/04/video-preview-pic.jpg'
        alt='preview-1'
      />
      <h4>
        Allow 30 sec preview <Switch onChange={onSwitchChange} />
      </h4>
      <span className={styles.preview_text}>
        (or 10% of the time if the video lasts less than 1min)
      </span>
    </div>
  );
};

export default index;
