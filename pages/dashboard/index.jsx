// libraries
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "../../context/profile";

// helpers
import { paginateArray } from "../../utils/helpers";

// requests
import { clientsReq, statsReq } from "../../utils/requests/dashboard";

// components
import PageLoading from "../../components/common/PageLoading";
import Stats from "../../components/Dashboard/Stats";
import SearchInput from "../../components/common/SearchInput";
import Table from "../../components/Dashboard/Table";

export default function Clients() {
  // context
  const { token } = useContext(ProfileContext);

  // state
  const [clients, setClients] = useState(null);
  const [response, setResponse] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState(null);
  const [period, setPeriod] = useState("TODAY");
  const [order, setOrder] = useState("sessionAsc");
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  console.log(clients);

  // get clients
  useEffect(() => {
    if (token) {
      clientsReq(token)
        .then((res) => setClients(res))
        .catch(() => toast.error("Failed to fetch clients list."));
    }
  }, [token]);

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

  // get stats
  useEffect(() => {
    if (token) {
      statsReq(token, period)
        .then((res) => setStats(res))
        .catch(() => toast.error("Failed to fetch stats."));
    }
  }, [token, period]);

  return (
    <>
      <Head>
        <title>Dashboard | Lynq </title>
      </Head>
      <div className="content-wrp">
        {!data || !stats ? (
          <PageLoading />
        ) : (
          <>
            <Stats data={stats} setPeriod={setPeriod} />
            <br />
            <h3 className={styles.stats_title}>Detail by clients</h3>
            <div className="clients-wrp">
              <div className="clients-wrp__top">
                <div
                  className={`invitations-menu-search ${styles.search_wrap}`}
                >
                  <SearchInput
                    setState={setSearchTerm}
                    placeholder="First and last name"
                  />
                </div>
              </div>
              <Table
                setPageSize={setPageSize}
                setPageNumber={setPageNumber}
                order={order}
                filteredData={filteredData}
                setOrder={setOrder}
                data={data}
              />
            </div>
          </>
        )}
        <br />
      </div>
    </>
  );
}
