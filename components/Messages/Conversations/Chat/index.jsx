// libraries
import { useState } from "react";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";

// styles
import styles from "./styles.module.sass";

// components
import SearchInput from "@/components/common/SearchInput";
import Sendbar from "./Sendbar";
import Messages from "./Messages";

const index = ({ selected, setSelected }) => {
  // states
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={`${styles.chat} ${selected ? styles.show : styles.hide}`}>
      {selected ? (
        <>
          <div className={styles.main}>
            <div className={styles.back_btn}>
              <Button onClick={() => setSelected(null)} icon={<LeftOutlined />}>
                Back
              </Button>
            </div>
            <SearchInput
              setState={setSearchTerm}
              placeholder="Search this conversation"
              size="medium"
            />
            <Messages selected={selected} />
          </div>
          <Sendbar />
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default index;
