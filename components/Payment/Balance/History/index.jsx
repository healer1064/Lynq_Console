// libraries
import moment from "moment";
import ReactTooltip from "react-tooltip";

// styles
import styles from "./styles.module.sass";

// components
import EmptyData from "@/components/common/EmptyData";

const PaymentHistory = ({ data }) => {
  return (
    <div className={styles.history}>
      <ReactTooltip />
      <h3>Payment History</h3>
      <div className={styles.history_wrap}>
        <div className={styles.table_head}>
          <p>Date</p>
          <p>Transfer Number</p>
          <p>Amount</p>
          <p>Status</p>
        </div>
        {data && data.length === 0 ? (
          <EmptyData title="No payment history to show" flag="payment" />
        ) : (
          data && data.map((item, index) => {
            return (
              <div key={index} className={styles.table_body}>
                <p>{moment(item.requestDate).format("MMM DD, YYYY")}</p>
                <p data-tip={item.transferNumber}>
                  {item.transferNumber || "null"}
                </p>
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
};

export default PaymentHistory;
