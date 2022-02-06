// libraries
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// context
import ProfileContext from "@/context/profile";

// requests
import { getClientsReq, getStatsReq } from "@/utils/requests/dashboard";

// components
import PageLoading from "../../components/common/PageLoading";
import Content from "../../components/Client/Content";

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // state
  const [clients, setClients] = useState(null);
  const [stats, setStats] = useState(null);
  const [period, setPeriod] = useState("Last 30 days");

  useEffect(() => {
    if (token) {
      getClientsReq(token)
        .then((res) => setClients(res))
        .catch(() => toast.error("Failed to fetch clients list."));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getStatsReq(token)
        .then((res) => setStats(res))
        .catch(() => toast.error("Failed to fetch stats."));
    }
  }, [token]);

  return (
    <>
      <Head>
        <title>Client | Lynq </title>
      </Head>
      <div className='content-wrp'>
        {!clients || !stats ? (
          <PageLoading />
        ) : (
          <Content
            clients={clients}
            stats={stats}
            period={period}
            setPeriod={setPeriod}
          />
        )}
      </div>
    </>
  );
};
export default index;
