// libraries
import ReactTooltip from "react-tooltip";
import moment from "moment";

// styles
import styles from "./styles.module.sass";

const PaymentsDetailItem = ({ data }) => {
  const {
    activity_name: type,
    email: client_email,
    base_price_teacher: price,
    starting_date,
    status,
  } = data;

  return (
    <div className={styles.row}>
      <ReactTooltip />
      <div className={`${styles.col} ${styles.first_name}`}>
        <span>{type || "-"}</span>
      </div>
      <div className={`${styles.col} ${styles.last_name}`}>
        <span>{client_email || "-"}</span>
      </div>
      <div className={`${styles.col} ${styles.email}`}>
        <span>{`${price ? "$" + price : "-"}`}</span>
      </div>
      <div className={`${styles.col} ${styles.session}`}>
        <span>{moment(starting_date).format("DD MMM, YYYY")}</span>
      </div>
      <div className={`${styles.col} ${styles.status}`}>
        <strong>
          {status === "CANCELLED"
            ? "Cancelled"
            : status === "CONFIRMED"
            ? "Confirmed"
            : status === "PENDING_PAYMENT"
            ? "Awaiting Payment"
            : status === "PENDING_TEACHER_VALIDATION"
            ? "Awaiting Teacher's Validation"
            : status === "SUCCESS"
            ? "Completed"
            : "-"}
        </strong>
      </div>
    </div>
  );
};

export default PaymentsDetailItem;
