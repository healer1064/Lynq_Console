// libraries
import { Dropdown, Button } from "antd";

// styles
import styles from "./styles.module.sass";

// icons
import { CaretDownOutlined } from "@ant-design/icons";

// components
import DropdownMenu from "@/components/common/DropdownMenu";
import SearchInput from "@/components/common/SearchInput";

const index = ({ filter, setFilter, setSearchTerm }) => {
  return (
    <div className={styles.requests_menu_search}>
      <Dropdown
        arrow
        overlay={
          <DropdownMenu
            state={filter}
            setState={setFilter}
            data={["All", "To Validate", "Expired"]}
          />
        }
        placement='bottomCenter'
      >
        <Button className={styles.requests_dropdown_btn} size='large'>
          {filter} <CaretDownOutlined />
        </Button>
      </Dropdown>
      <SearchInput placeholder='Search by email' setState={setSearchTerm} />
    </div>
  );
};

export default index;
