// libraries
import { useState } from "react";

// styles
import styles from "./styles.module.sass";

// components
import List from "../List";
import Chat from "../Chat";

const index = () => {
  // states
  const [messages, setMessages] = useState([
    "Albert Grass",
    "Peter Wilson",
    "Lamine Lang",
  ]);
  const [selected, setSelected] = useState(null);

  return (
    <div className={styles.content}>
      <List
        recipients={messages}
        recipient={selected}
        setRecipient={setSelected}
      />
      <Chat selected={selected} setSelected={setSelected} />
    </div>
  );
};

export default index;
