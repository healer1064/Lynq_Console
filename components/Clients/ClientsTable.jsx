// components
import EmptyData from "../common/EmptyData";
import ClientItem from "./ClientItem";
import Pagination from "./Pagination";

// icons
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const ClientsTable = ({ data, setData, order, setOrder }) => {
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
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              setOrder(order == "sessionAsc" ? "sessionDsc" : "sessionAsc")
            }
            className="col session"
          >
            <strong
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Last Session{" "}
              {order == "sessionDsc" ? (
                <CaretUpOutlined
                  style={{
                    marginLeft: "30px",
                    opacity: order == "sessionDsc" ? "1" : "0.6",
                  }}
                />
              ) : (
                <CaretDownOutlined
                  style={{
                    marginLeft: "30px",
                    opacity: order == "sessionAsc" ? "1" : "0.6",
                  }}
                />
              )}
            </strong>
          </div>
          <div
            style={{
              cursor: "pointer",
            }}
            className="col revenue"
            onClick={() =>
              setOrder(order == "priceAsc" ? "priceDsc" : "priceAsc")
            }
          >
            <strong
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Total Revenue{" "}
              {order == "priceDsc" ? (
                <CaretUpOutlined
                  style={{
                    marginLeft: "30px",
                    opacity: order == "priceDsc" ? "1" : "0.6",
                  }}
                />
              ) : (
                <CaretDownOutlined
                  style={{
                    marginLeft: "30px",
                    opacity: order == "priceAsc" ? "1" : "0.6",
                  }}
                />
              )}
            </strong>
          </div>
          {/* <div className="col actions"></div> */}
        </div>
        {data.map((item, i) => {
          return <ClientItem data={item} key={i} />;
        })}
        <Pagination data={data} setData={setData} />
      </div>
    );
  }
};

export default ClientsTable;
