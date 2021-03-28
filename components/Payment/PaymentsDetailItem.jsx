import ReactTooltip from "react-tooltip";

const PaymentsDetailItem = ({ data }) => {
  const { type, client_email, price, starting_date, status } = data;

  return (
    <div className="row">
      <ReactTooltip />
      <div className="col first__name">
        <span>{type}</span>
      </div>
      <div className="col last__name">
        <span>{client_email}</span>
      </div>
      <div className="col email">
        <span>${price}</span>
      </div>
      <div className="col session">
        <span>{starting_date}</span>
      </div>
      <div className="col revenue">
        <strong>{status}</strong>
      </div>
    </div>
  );
};

export default PaymentsDetailItem;
