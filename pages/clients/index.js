// libraries
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

// components
import Leftbar from "../../components/Leftbar";
import Navbar from "../../components/Navbar";
import AddNewButton from "../../components/common/AddNewButton";
import ClientsTable from "../../components/Clients/ClientsTable";
import PageLoading from "../../components/common/PageLoading";
import EmptyData from "../../components/common/EmptyData";

// context
import ProfileContext from "../../context/profile";

export default function Clients() {
  // router
  const router = useRouter();

  // context
  const { token } = useContext(ProfileContext);

  // state
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (
      localStorage.getItem("linqToken") === null &&
      localStorage == undefined
    ) {
      router.push("/login");
    }
    if (token) getClients();
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
      `https://api.lynq.app/account/clients?t=${token}`,
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
                  placeholder="Search by name"
                  className="clients-wrp__search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ClientsTable
                data={
                  searchTerm === ""
                    ? data
                    : data.filter(
                        (i) =>
                          i.first_name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          i.last_name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                      )
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
