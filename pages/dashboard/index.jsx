// libraries
import Head from "next/head";
import { useContext, useEffect, useState } from "react";

// context
import ProfileContext from "../../context/profile";

// components
import Leftbar from "../../components/Leftbar";
import Navbar from "../../components/Navbar";
// import AddNewButton from "../../components/common/AddNewButton";
import ClientsTable from "../../components/Clients/ClientsTable";
import PageLoading from "../../components/common/PageLoading";
import EmptyData from "../../components/common/EmptyData";
import SearchInput from "../../components/common/SearchInput";
import HomeStats from "../../components/Home/HomeStats";

export default function Clients() {
  // context
  const { token } = useContext(ProfileContext);

  // state
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statsData, setStatsData] = useState(null);
  const [stats, setStats] = useState("TODAY");

  useEffect(() => {
    if (token) getClients();
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchStats();
    }
  }, [token, stats]);

  const fetchStats = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        `https://api.lynq.app/account/stats?t=${token}&period=${stats}`,
        config
      );

      const _data = await response.json();

      setStatsData(_data);
    } catch (err) {
      toast.error("Error Occured, Stats Cannot Be Shown");
    }
  };

  const getClients = async () => {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    const response = await fetch(
      `https://api.lynq.app/account/clients?t=${token}`,
      config
    );
    const data = await response.json();

    setData(data);
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar active="dashboard" />
      <div className="page-wrp">
        <Leftbar active="dashboard" />
        <div className="content-wrp">
          {!data ? (
            <PageLoading />
          ) : (
            <>
              <HomeStats data={statsData} setStats={setStats} />
              <br />
              <h3
                style={{ margin: "0", fontWeight: "700", fontSize: "1.4rem" }}
              >
                Detail by clients
              </h3>
              {data.length === 0 ? (
                <EmptyData title="No clients to show" />
              ) : (
                <div className="clients-wrp">
                  <div className="clients-wrp__top">
                    {/* <AddNewButton title="New Client" /> */}
                    {/* <input
                      type="text"
                      placeholder="Search by name"
                      className="clients-wrp__search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    /> */}
                    <div
                      style={{ width: "100%" }}
                      className="invitations-menu-search"
                    >
                      <SearchInput setState={setSearchTerm} />
                    </div>
                  </div>
                  <ClientsTable
                    data={
                      searchTerm === ""
                        ? data
                        : data.filter(
                            (i) =>
                              (i.first_name &&
                                i.first_name
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())) ||
                              (i.last_name &&
                                i.last_name
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()))
                          )
                    }
                  />
                </div>
              )}
            </>
          )}
          <br />
        </div>
      </div>
    </>
  );
}
