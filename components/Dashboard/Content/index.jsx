// libraries
import { useEffect, useState } from "react";

// styles
import styles from "./styles.module.sass";

// helpers
import { paginateArray } from "@/utils/helpers";

// components
import Stats from "../Stats";
import SearchInput from "@/components/common/SearchInput";
import Table from "../Table";

const index = ({ clients, stats, setPeriod }) => {
  // states
  const [response, setResponse] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("sessionAsc");
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  // handle search
  useEffect(() => {
    if (clients) {
      setResponse(
        searchTerm === ""
          ? clients
          : clients.filter(
              (i) =>
                (i.first_name &&
                  i.first_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) ||
                (i.last_name &&
                  i.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
            )
      );
    }
  }, [searchTerm, clients]);

  useEffect(() => {
    if (response) {
      // setting ascending descending filter
      order == "sessionAsc"
        ? setFilteredData(
            response.sort(
              (a, b) => new Date(a.starting_date) - new Date(b.starting_date)
            )
          )
        : order == "sessionDsc"
        ? setFilteredData(
            response.sort(
              (a, b) => new Date(b.starting_date) - new Date(a.starting_date)
            )
          )
        : order == "priceAsc"
        ? setFilteredData(
            response.sort((a, b) => a.display_price - b.display_price)
          )
        : setFilteredData(
            response.sort((a, b) => b.display_price - a.display_price)
          );

      // setting pagination
      if (filteredData) {
        setData(paginateArray(filteredData, pageSize, pageNumber));
      }
    }
  }, [response, order, pageNumber, pageSize, filteredData]);

  return (
    <>
      <Stats data={stats} setPeriod={setPeriod} />
      <h3 className={styles.stats_title}>Detail by clients</h3>
      <div className={styles.clients}>
        <div className={styles.top}>
          <div className={`invitations-menu-search ${styles.search_wrap}`}>
            <SearchInput
              setState={setSearchTerm}
              placeholder="First and last name"
            />
          </div>
        </div>
        {data && (
          <Table
            setPageSize={setPageSize}
            setPageNumber={setPageNumber}
            order={order}
            filteredData={filteredData}
            setOrder={setOrder}
            data={data}
          />
        )}
      </div>
    </>
  );
};

export default index;
