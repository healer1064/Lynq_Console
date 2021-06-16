// styles
import styles from "./styles.module.sass";

// components
import Item from "./Item";

const Messages = ({ selected, searchTerm }) => {
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
            .sort((a, b) => new Date(b.sentDate) - new Date(a.sentDate))
            .map((item, index) => {
              return <Item key={index} data={item} selected={selected} />;
            })
        : selected.content
            .sort((a, b) => new Date(b.sentDate) - new Date(a.sentDate))
            .map((item, index) => {
              return <Item key={index} data={item} selected={selected} />;
            })}
    </div>
  );
};

export default Messages;
