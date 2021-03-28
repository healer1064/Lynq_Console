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
    } else if (filter === "completed") {
      let arr = data.filter((i) => i.status === "Completed");
      setArray(arr);
    } else if (filter === "coming") {
      let arr = data.filter((i) => i.status === "Coming");
      setArray(arr);
    } else {
      let arr = data.filter((i) => i.status === "Awaiting Payment");
      setArray(arr);
    }
  }, [filter]);

  return (
    <>
      <div className="payment-filter">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="coming">Coming</option>
          <option value="awaiting-payment">Awaiting Payment</option>
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
