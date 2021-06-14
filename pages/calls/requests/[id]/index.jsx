// libraries
import { useState, useContext } from "react";
import Head from "next/head";

// context
import ProfileContext from "@/context/profile";

// components
import PageLoading from "@/components/common/PageLoading";
import Content from "@/components/Calls/SingleRequest/Content";

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [request, setRequest] = useState(null);

  return (
    <>
      <Head>
        <title>Request | Lynq</title>
      </Head>
      <div className="content-wrp">
        {/* {!data || !apt ? <PageLoading /> : <Content />} */}
        {request ? <PageLoading /> : <Content />}
      </div>
    </>
  );
};

export default index;
