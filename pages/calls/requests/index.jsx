// libraries
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { toast } from "react-toastify";

// context
import ProfileContext from "@/context/profile";

// requests
import { getRequestReq } from "@/utils/requests/calls/requests";

// components
import PageLoading from "@/components/common/PageLoading";
import Content from "@/components/Calls/Requests/Content";

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    if (token) {
      getRequestReq(token)
        .then((res) => {
          setRequests(res);
        })
        .catch(() => {
          toast.error("Failed to get call requests!");
        });
    }
  }, [token]);

  return (
    <div className="content-wrp">
      <Head>
        <title>Calls Requests | Lynq</title>
      </Head>
      {!requests ? <PageLoading /> : <Content list={requests} />}
    </div>
  );
};

export default index;
