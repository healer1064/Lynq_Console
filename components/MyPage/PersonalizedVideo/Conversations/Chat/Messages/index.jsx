// libraries
import { useEffect, useRef } from "react";

// styles
import styles from "./styles.module.sass";

// components
import Item from "./Item";

const Messages = ({ selected, searchTerm }) => {
  // ref
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [selected.content]);

  // scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.messages}>
      {selected.content.length > 0 && searchTerm != ""
        ? selected.content
            .filter((item) => {
              return item.content
                ? item.content.toLowerCase().includes(searchTerm.toLowerCase())
                : item.fileName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            })
            .sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate))
            .map((item, index) => {
              return <Item key={index} data={item} selected={selected} />;
            })
        : selected.content
            .sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate))
            .map((item, index) => {
              return <Item key={index} data={item} selected={selected} />;
            })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
