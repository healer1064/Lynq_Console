// libraries
import { useState } from "react";

// styles
import styles from "./styles.module.sass";

// components
import Item from "./Item";

const Messages = ({ selected }) => {
  // states
  const [messages, setMessages] = useState({
    ...selected,
    messages: [1, 2, 3],
  });

  return (
    <div className={styles.messages}>
      {messages.messages.map((index, item) => {
        return <Item key={index} data={item} selected={selected} />;
      })}
    </div>
  );
};

export default Messages;
