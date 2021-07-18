// libraries
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { Dropdown, Button } from "antd";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// icons
import { CaretDownOutlined } from "@ant-design/icons";

// utils
import { getMasterclass } from "@/utils/requests/masterclass";

// components
import AddButton from "@/components/common/AddButton";
import DropdownMenu from "@/components/common/DropdownMenu";
import List from "@/components/Masterclass/List";
import PageLoading from "@/components/common/PageLoading";
import EmptyData from "@/components/common/EmptyData";

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [list, setList] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (token) {
      getMasterclass(token)
        .then((res) => {
          if (res.error) {
            toast.error("Failed to get masterclasses.");
          } else {
            setList(res);
          }
        })
        .catch(() => toast.error("Failed to get masterclasses."));
    }
  }, [token]);

  return list ? (
    <div>
      <Link href='/masterclass/new'>
        <AddButton title='New Masterclass' />
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
        placement='bottomCenter'
      >
        <Button className={styles.dropdown_btn} size='large'>
          {filter} <CaretDownOutlined />
        </Button>
      </Dropdown>

      <List list={list} />
    </div>
  ) : (
    <PageLoading />
  );
};

export default index;
