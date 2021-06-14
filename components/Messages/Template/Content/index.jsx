// libraries
import { useState } from "react";

// styles
import styles from "./styles.module.sass";

// components
import ToSave from "../ToSave";
import ToEdit from "../ToEdit";

const index = () => {
  // states
  const [view, setView] = useState(0);

  return (
    <div className={styles.content}>
      <h3>Delivery Time</h3>
      <p>
        This indicates to the client the maximum time he will have to wait
        before getting an answer
      </p>
      {view == 0 ? (
        <ToSave setState={setView} />
      ) : (
        <ToEdit setState={setView} />
      )}
    </div>
  );
};

export default index;
