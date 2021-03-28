import ReactTooltip from "react-tooltip";

const ClientItem = ({ data }) => {
  const {
    first_name,
    last_name,
    email,
    starting_date,
    display_price: price,
  } = data;

  return (
    <div className="row">
      <ReactTooltip />
      <div className="col first__name">
        <span>{first_name}</span>
      </div>
      <div className="col last__name">
        <span>{last_name}</span>
      </div>
      <div className="col email">
        <span data-tip={email}>{email}</span>
      </div>
      <div className="col session">
        <span>{starting_date.split("T")[0]}</span>
      </div>
      <div className="col revenue">
        <strong>${price || "0"}</strong>
      </div>
      {/* <div className="col actions">
                <div className="action">
                    <img src="/img/clients-table-remove.svg" alt="" />
                </div>
                <div className="action">
                    <img src="/img/clients-table-edit.svg" alt="" />
                </div>
            </div> */}
    </div>
  );
};

export default ClientItem;
