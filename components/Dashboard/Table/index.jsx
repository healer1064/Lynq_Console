// styles
import styles from "./styles.module.sass";

// icons
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

// components
import EmptyData from "../../common/EmptyData";
import Item from "./Item";
import Pagination from "./Pagination";

const index = ({
  data,
  filteredData,
  order,
  setOrder,
  setPageSize,
  setPageNumber,
}) => {
  if (data.length === 0) {
    return <EmptyData title='No clients to show' />;
  } else {
    return (
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.head}`}>
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              setOrder(order == "fnameAsc" ? "fnameDsc" : "fnameAsc")
            }
            className={`${styles.col} ${styles.first_name}`}
          >
            <strong
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              First Name{" "}
              {order == "fnameDsc" ? (
                <CaretUpOutlined
                  style={{
                    marginLeft: "30px",
                    opacity: order == "fnameDsc" ? "1" : "0.6",
                  }}
                />
              ) : (
                <CaretDownOutlined
                  style={{
                    marginLeft: "30px",
                    opacity: order == "fnameAsc" ? "1" : "0.6",
                  }}
                />
              )}
            </strong>
          </div>
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              setOrder(order == "lnameAsc" ? "lnameDsc" : "lnameAsc")
            }
            className={`${styles.col} ${styles.last_name}`}
          >
            <strong
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Last Name{" "}
              {order == "lnameDsc" ? (
                <CaretUpOutlined
                  style={{
                    marginLeft: "30px",
                    opacity: order == "lnameDsc" ? "1" : "0.6",
                  }}
                />
              ) : (
                <CaretDownOutlined
                  style={{
                    marginLeft: "30px",
                    opacity: order == "lnameAsc" ? "1" : "0.6",
                  }}
                />
              )}
            </strong>
          </div>
          <div className={`${styles.col} ${styles.email}`}>
            <strong>Email Address</strong>
          </div>
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              setOrder(order == "sessionAsc" ? "sessionDsc" : "sessionAsc")
            }
            className={`${styles.col} ${styles.session}`}
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
            className={`${styles.col} ${styles.revenue}`}
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
        </div>
        {data.map((item, i) => {
          return <Item data={item} key={i} />;
        })}
        <Pagination
          filteredData={filteredData}
          setPageSize={setPageSize}
          setPageNumber={setPageNumber}
        />
      </div>
    );
  }
};

export default index;
