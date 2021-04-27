import { useState, useEffect } from "react";

// components
import PaymentsDetailItem from "./PaymentsDetailItem";

const PaymentsDetails = ({ data }) => {
  // states
  const [array, setArray] = useState(data);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (filter === "all") {
      setArray(data);
    } else if (filter === "CONFIRMED") {
      let arr = data.filter((i) => i.status === "CONFIRMED");
      setArray(arr);
    } else if (filter === "CANCELLED") {
      let arr = data.filter((i) => i.status === "CANCELLED");
      setArray(arr);
    } else if (filter === "PENDING_TEACHER_VALIDATION") {
      let arr = data.filter((i) => i.status === "PENDING_TEACHER_VALIDATION");
      setArray(arr);
    } else {
      let arr = data.filter((i) => i.status === "PENDING_PAYMENT");
      setArray(arr);
    }
  }, [filter]);

  return (
    <>
      <div className="payment-filter">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="CONFIRMED">Completed</option>
          <option value="PENDING_PAYMENT">Awaiting Payment</option>
          <option value="PENDING_TEACHER_VALIDATION">
            Awaiting Teacher's Validation
          </option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
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
        {array.map((item, i) => {
          return <PaymentsDetailItem data={item} key={i} />;
        })}
      </div>
    </>
  );
};

export default PaymentsDetails;
