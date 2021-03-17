// libraries
import Head from "next/head";
import useSWR from "swr";

// components
import Leftbar from "../../components/Leftbar";
import Navbar from "../../components/Navbar";
import NewClientButton from "../../components/Clients/NewClientButton";
import ClientsTable from "../../components/Clients/ClientsTable";
import PageLoading from "../../components/common/PageLoading";

// utils
import fetcher from "../../utils/fetcher";
import EmptyData from "../../components/common/EmptyData";

export default function Clients() {
  // const token = localStorage.getItem("linqToken");

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzb21ld2ViLm9yZyIsImlkIjoiMGNkMzhjNTctZWJlYi00MjQ5LThkNDMtOGExZTQyM2JhYTAyIn0.TKOttASFBDRooHPwiPr1HRhmXT2IrDKcqEGP2H5_BsM";

  const { data, error } = useSWR(["/api/clients", token], fetcher);

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
                {/* <NewClientButton /> */}
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
