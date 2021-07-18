// libraries
import { useState, useContext } from "react";
import { Switch } from "antd";

// context
import ProfileContext from "@/context/profile";

// styles
import styles from "./styles.module.sass";

// requests
import {
  postMessageTemplate,
  putMessageTemplate,
} from "@/utils/requests/messages";

// components
import ToSave from "../ToSave";
import ToEdit from "../ToEdit";
import { toast } from "react-toastify";

const index = ({ data, responseRefresh }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [active, setActive] = useState(false);
  const [view, setView] = useState(data.length > 0 ? 1 : 0);

  // on switch change
  function onChange(checked) {
    if (data.length > 0) {
      putMessageTemplate(token, data[0].id, { ...data[0], enabled: checked })
        .then(() => {
          responseRefresh();
          setActive(checked);
        })
        .catch(() => toast.error("Failed to change status"));
    } else {
      postMessageTemplate(token, { enabled: checked })
        .then(() => {
          responseRefresh();
          setActive(checked);
        })
        .catch(() => toast.error("Failed to change status"));
    }
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
        <ToSave setState={setView} data={data} />
      ) : (
        <ToEdit setState={setView} data={data} />
      )}
    </div>
  );
};

export default index;
