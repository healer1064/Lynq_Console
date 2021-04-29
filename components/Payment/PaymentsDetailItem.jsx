import ReactTooltip from "react-tooltip";
import moment from "moment";

const PaymentsDetailItem = ({ data }) => {
  const {
    activity_name: type,
    email: client_email,
    price,
    starting_date,
    status,
  } = data;

  return (
    <div className="row">
      <ReactTooltip />
      <div className="col first__name">
        <span>{type || "-"}</span>
      </div>
      <div className="col last__name">
        <span>{client_email || "-"}</span>
      </div>
      <div className="col email">
        <span>{`${price ? "$" + price : "-"}`}</span>
      </div>
      <div className="col session">
        <span>{moment(starting_date).format("DD MMM, YYYY")}</span>
      </div>
      <div className="col revenue">
        <strong>
          {status === "CANCELLED"
            ? "Cancelled"
            : status === "CONFIRMED"
            ? "Completed"
            : status === "PENDING_PAYMENT"
            ? "Awaiting Payment"
            : status === "PENDING_TEACHER_VALIDATION"
            ? "Awaiting Teacher's Validation"
            : "-"}
        </strong>
      </div>
    </div>
  );
};

export default PaymentsDetailItem;
