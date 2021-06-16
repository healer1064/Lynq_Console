// libraries
import { useState } from "react";
import Link from "next/link";
import { Dropdown, Button } from "antd";

// styles
import styles from "./styles.module.sass";

// icons
import { CaretDownOutlined } from "@ant-design/icons";

// components
import AddButton from "@/components/common/AddButton";
import DropdownMenu from "@/components/common/DropdownMenu";
import List from "@/components/Masterclass/List";

const index = () => {
  // states
  const [filter, setFilter] = useState("All");

  return (
    <div>
      <Link href="/masterclass/new">
        <AddButton title="New Masterclass" />
      </Link>
      <Dropdown
        arrow
        overlay={
          <DropdownMenu
            state={filter}
            setState={setFilter}
            data={["All", "Scheduled", "Completed"]}
          />
        }
        placement="bottomCenter"
      >
        <Button className={styles.dropdown_btn} size="large">
          {filter} <CaretDownOutlined />
        </Button>
      </Dropdown>
      <List />
    </div>
  );
};

export default index;
