// libraries
import { useState, useContext } from "react";
import Head from "next/head";

// context
import ProfileContext from "@/context/profile";

// components
import PageLoading from "@/components/common/PageLoading";
import Content from "@/components/Masterclass/Content";

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [masterclasses, setMasterclasses] = useState(null);

  return (
    <div className="content-wrp">
      <Head>
        <title>Masterclass | Lynq</title>
      </Head>
      {masterclasses ? <PageLoading /> : <Content />}
    </div>
  );
};

export default index;
