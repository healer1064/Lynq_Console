// libraries
import { useState, useEffect } from "react";
import { Switch } from "antd";

// styles
import styles from "./styles.module.sass";

// components
import ToSave from "../ToSave";
import ToEdit from "../ToEdit";

const index = () => {
  // states
  const [active, setActive] = useState(false);
  const [view, setView] = useState(0);

  // on switch change
  function onChange(checked) {
    console.log(checked);
    setActive(checked);
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
      <h3>Delivery Time</h3>
      <p>This indicates the maximum time you have to respond to the request</p>
      {view == 0 ? (
        <ToSave setState={setView} />
      ) : (
        <ToEdit setState={setView} />
      )}
    </div>
  );
};

export default index;
