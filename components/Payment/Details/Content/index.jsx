// libraries
import { useState, useEffect } from "react";
import { Dropdown, Button } from "antd";
import Fade from "react-reveal/Fade";

// icons
import { CaretDownOutlined } from "@ant-design/icons";

// styles
import styles from "./styles.module.sass";

// components
import DropdownMenu from "@/components/common/DropdownMenu";
import Details from "../Details";

const index = ({ details }) => {
  // states
  const [data, setData] = useState(details);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (filter === "All") {
      setData(details);
    } else if (filter === "Confirmed") {
      let arr = details.filter((i) => i.status === "CONFIRMED");
      setData(arr);
    } else if (filter === "Cancelled") {
      let arr = details.filter((i) => i.status === "CANCELLED");
      setData(arr);
    } else if (filter === "Requests Awaiting Approval") {
      let arr = details.filter(
        (i) => i.status === "PENDING_TEACHER_VALIDATION"
      );
      setData(arr);
    } else if (filter === "Completed") {
      let arr = details.filter((i) => i.status === "SUCCESS");
      setData(arr);
    } else {
      let arr = details.filter((i) => i.status === "PENDING_PAYMENT");
      setData(arr);
    }
  }, [filter]);

  return (
    <Fade>
      <div className={styles.details}>
        <Dropdown
          arrow
          overlay={
            <DropdownMenu
              state={filter}
              setState={setFilter}
              data={[
                "All",
                "Completed",
                "Confirmed",
                "Pending Payment",
                "Requests Awaiting Approval",
                "Cancelled",
              ]}
            />
          }
          placement="bottomCenter"
        >
          <Button className={styles.dropdown_btn} size="large">
            {filter} <CaretDownOutlined />
          </Button>
        </Dropdown>
        <Details data={data} />
      </div>
    </Fade>
  );
};

export default index;
