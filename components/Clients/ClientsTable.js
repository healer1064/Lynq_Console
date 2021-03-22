// components
import EmptyData from "../common/EmptyData";
import ClientItem from "./ClientItem";

const ClientsTable = ({ data }) => {
  console.log(data);

  if (data.length === 0) {
    return <EmptyData title="No clients to show" />;
  } else {
    return (
      <div className="clients-table">
        <div className="row head">
          <div className="col first__name">
            <strong>First Name</strong>
          </div>
          <div className="col last__name">
            <strong>Last Name</strong>
          </div>
          <div className="col email">
            <strong>Email Address</strong>
          </div>
          <div className="col session">
            <strong>Last Session</strong>
          </div>
          <div className="col revenue">
            <strong>Total Revenue</strong>
          </div>
          {/* <div className="col actions"></div> */}
        </div>
        {data.map((item, i) => {
          return <ClientItem data={item} key={i} />;
        })}
      </div>
    );
  }
};

export default ClientsTable;
