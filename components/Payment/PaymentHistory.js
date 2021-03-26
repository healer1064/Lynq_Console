// utils
import { fullDateWithoutDay } from "../../utils/dates";

// components
import EmptyData from "../common/EmptyData";

const PaymentHistory = ({ data }) => {
  if (!data) {
    return <></>;
  } else {
    return (
      <div className="payment-history">
        <h3>Payment History</h3>
        <div className="payment-histroy-wrap">
          <div className="payment-history-table-head">
            <p>Date</p>
            <p>Transfer Number</p>
            <p>Amount</p>
            <p>Status</p>
          </div>
          {data && data.length === 0 ? (
            <div style={{ marginTop: "30px" }}>
              <EmptyData title="No payment history to show" />
            </div>
          ) : (
            data.map((item, index) => {
              return (
                <div key={index} className="payment-history-table-body">
                  <p>{fullDateWithoutDay(item.requestDate)}</p>
                  <p>{item.transferNumber || "null"}</p>
                  <p>${item.amount}</p>
                  <p>
                    <span>{item.status}</span>
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
};

export default PaymentHistory;
