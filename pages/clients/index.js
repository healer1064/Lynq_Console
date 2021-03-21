// libraries
import Head from "next/head";
import { useContext, useEffect, useState } from "react";

// components
import Leftbar from "../../components/Leftbar";
import Navbar from "../../components/Navbar";
import AddNewButton from "../../components/common/AddNewButton";
import ClientsTable from "../../components/Clients/ClientsTable";
import PageLoading from "../../components/common/PageLoading";
import EmptyData from "../../components/common/EmptyData";

// utils
import fetcher from "../../utils/fetcher";

// context
import ProfileContext from "../../context/profile";

export default function Clients() {
  const { token } = useContext(ProfileContext);

  // state
  const [data, setData] = useState(null);

  // const { data, error } = useSWR(["/api/clients", token], fetcher);

  useEffect(() => {
    getClients();
  }, [token]);

  const getClients = async () => {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    const response = await fetch(
      `http://reb00t.uc.r.appspot.com/account/clients?t=${token}`,
      config
    );
    const data = await response.json();

    setData(data);
  };

  return (
    <>
      <Head>
        <title>Clients</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar active="clients" />
      <div className="page-wrp">
        <Leftbar active="clients" />
        <div className="content-wrp">
          {!data ? (
            <PageLoading />
          ) : data.length === 0 ? (
            <EmptyData title="No clients to show" />
          ) : (
            <div className="clients-wrp">
              <div className="clients-wrp__top">
                {/* <AddNewButton title="New Client" /> */}
                <input
                  type="text"
                  placeholder="Search"
                  className="clients-wrp__search"
                />
              </div>
              <ClientsTable data={data} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
