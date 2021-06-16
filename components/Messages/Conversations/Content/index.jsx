// libraries
import { useState } from "react";

// styles
import styles from "./styles.module.sass";

// utils
import { getLatestMessage } from "@/utils/helpers/index";

// components
import List from "../List";
import Chat from "../Chat";
import NoConversation from "../NoConversation";

const index = ({ list, refreshResponse }) => {
  // states
  const [selected, setSelected] = useState(null);

  return (
    <div className={styles.content}>
      <List
        recipients={getLatestMessage(list)}
        recipient={selected}
        setRecipient={setSelected}
      />
      {selected ? (
        <Chat
          selected={selected}
          setSelected={setSelected}
          refreshResponse={refreshResponse}
        />
      ) : (
        <NoConversation selected={selected} setSelected={setSelected} />
      )}
    </div>
  );
};

export default index;
