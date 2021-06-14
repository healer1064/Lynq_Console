// libraries
import { useState, useContext } from "react";
import Head from "next/head";

// context
import ProfileContext from "@/context/profile";

// components
import PageLoading from "@/components/common/PageLoading";
import Details from "@/components/Masterclass/Details";

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
        {request ? <PageLoading /> : <Details />}
      </div>
    </>
  );
};

export default index;
