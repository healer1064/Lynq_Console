// libraries
import { useState } from "react";

// styles
import styles from "./styles.module.sass";

// components
import SearchInput from "@/components/common/SearchInput";
import Item from "./Item";

const index = ({ recipients, recipient, setRecipient }) => {
  // states
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={`${styles.list} ${recipient ? styles.hide : styles.show}`}>
      <SearchInput placeholder="Search" setState={setSearchTerm} />
      <div className={styles.list_self}>
        {searchTerm != ""
          ? recipients
              .filter((item) => {
                return `${item.customerFirstName} ${item.customerLastName}`
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              })
              .map((item, index) => {
                return (
                  <Item key={index} data={item} setRecipient={setRecipient} />
                );
              })
          : recipients.map((item, index) => {
              return (
                <Item key={index} data={item} setRecipient={setRecipient} />
              );
            })}
      </div>
    </div>
  );
};

export default index;
