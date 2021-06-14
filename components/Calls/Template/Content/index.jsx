// libraries
import { useState } from "react";

// styles
import styles from "./styles.module.sass";

// components
import List from "../List";

const index = () => {
  // states
  const [options, setOptions] = useState([
    { id: 1, length: 15, status: false },
    { id: 2, length: 30, status: false },
    { id: 3, length: 60, status: false },
  ]);

  return (
    <div className={styles.content}>
      <p>Select the options to show on your public profile</p>
      <h3>Length</h3>
      <List options={options} setOptions={setOptions} />
      <h3>
        Add a description for the clients <span>(optional)</span>
      </h3>
      <textarea placeholder="You can use this block to give examples of the topics to be addressed and any other information you might find useful"></textarea>
      <button>Save</button>
    </div>
  );
};

export default index;
