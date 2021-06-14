// libraries
import React from "react";
import Head from "next/head";

// components
import Content from "@/components/Calls/Requests/Content";

const index = () => {
  return (
    <div className="content-wrp">
      <Head>
        <title>Calls Requests | Lynq</title>
      </Head>
      <Content />
    </div>
  );
};

export default index;
