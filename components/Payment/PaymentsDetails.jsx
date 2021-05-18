import { useState, useEffect } from "react";
import { Dropdown, Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

// styles
import "antd/dist/antd.css";

// components
import PaymentsDetailItem from "./PaymentsDetailItem";
import DropdownMenu from "../common/DropdownMenu";

const PaymentsDetails = ({ data }) => {
  // states
  const [array, setArray] = useState(data);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (filter === "All") {
      setArray(data);
    } else if (filter === "Confirmed") {
      let arr = data.filter((i) => i.status === "CONFIRMED");
      setArray(arr);
    } else if (filter === "Cancelled") {
      let arr = data.filter((i) => i.status === "CANCELLED");
      setArray(arr);
    } else if (filter === "Requests Awaiting Approval") {
      let arr = data.filter((i) => i.status === "PENDING_TEACHER_VALIDATION");
      setArray(arr);
    } else if (filter === "Completed") {
      let arr = data.filter((i) => i.status === "SUCCESS");
      setArray(arr);
    } else {
      let arr = data.filter((i) => i.status === "PENDING_PAYMENT");
      setArray(arr);
    }
  }, [filter]);

  return (
    <>
      <br />
      <br />
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
        <Button className="requests-dropdown-btn" size="large">
          {filter} <CaretDownOutlined />
        </Button>
      </Dropdown>
      <br />
      <div className="clients-table">
        <div className="row head">
          <div className="col first__name">
            <strong>Type</strong>
          </div>
          <div className="col last__name">
            <strong>Client's Email</strong>
          </div>
          <div className="col email">
            <strong>Price</strong>
          </div>
          <div className="col session">
            <strong>Session Date</strong>
          </div>
          <div className="col revenue">
            <strong>Status</strong>
          </div>
        </div>
        {array.length === 0 ? (
          <p style={{ textAlign: "center", margin: "20px 0" }}>
            No items to show!
          </p>
        ) : (
          array.map((item, i) => {
            return <PaymentsDetailItem data={item} key={i} />;
          })
        )}
      </div>
    </>
  );
};

export default PaymentsDetails;
