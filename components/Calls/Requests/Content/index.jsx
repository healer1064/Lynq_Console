// libraries
import { useState } from "react";
import Fade from "react-reveal/Fade";

// styles
import styles from "./styles.module.sass";

// components
import RequestsHead from "../Head";
import List from "../List";

const index = ({ list }) => {
  // states
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Fade>
        <div className={styles.card_container}>
          <>
            <RequestsHead
              filter={filter}
              setFilter={setFilter}
              setSearchTerm={setSearchTerm}
            />
            <List
              list={
                searchTerm === ""
                  ? list
                  : list.filter(
                      (item) =>
                        item.activity_name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        item.email
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
              }
              filter={filter}
            />
          </>
        </div>
      </Fade>
    </>
  );
};

export default index;
