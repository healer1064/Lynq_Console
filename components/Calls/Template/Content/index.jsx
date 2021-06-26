// libraries
import { useState, useEffect } from "react";
import { Switch } from "antd";

// styles
import styles from "./styles.module.sass";

// components
import List from "../List";
import { toast } from "react-toastify";

const index = () => {
  // states
  const [active, setActive] = useState(false);
  const [options, setOptions] = useState([
    { id: 1, length: 15, status: false },
    { id: 2, length: 30, status: false },
    { id: 3, length: 60, status: false },
  ]);

  useEffect(() => {
    options.filter((item) => item.status == true).length > 0
      ? setActive(true)
      : setActive(false);
  }, [options]);

  // on switch change
  function onChange(checked) {
    options.filter((item) => item.status == true).length > 0
      ? setActive(checked)
      : toast.info("Please set an option first");
  }

  return (
    <div className={styles.content}>
      <div className={styles.switch_wrap}>
        <Switch
          checked={active}
          onChange={onChange}
          className={active ? styles.switch_on : styles.switch_off}
        />
        <span>{active ? "Activate" : "Deactivate"}</span>
      </div>
      <p>Select the options to show on your public profile</p>
      <h3>Length</h3>
      <List options={options} setOptions={setOptions} />
      <button className={styles.btn}>Save</button>
    </div>
  );
};

export default index;
