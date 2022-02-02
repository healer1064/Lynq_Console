// libraries
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// context
import ProfileContext from "@/context/profile";

// requests
import { getRequestReq } from "@/utils/requests/calls/requests";

// components
import PageLoading from "@/components/common/PageLoading";
import Content from "@/components/Calls/SingleRequest/Content";

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // router
  const router = useRouter();

  // params
  const { id } = router.query;

  // states
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (token && id) {
      getRequestReq(token)
        .then((res) => {
          setRequest(res.find((item) => item.id == id));
        })
        .catch(() => {
          toast.error("Failed to get call requests!");
        });
    }
  }, [token, id]);

  return (
    <>
      <Head>
        <title>Request | Lynq</title>
      </Head>
      <div className='content-wrp'>
        {!request ? <PageLoading /> : <Content request={request} />}
      </div>
    </>
  );
};

export default index;
