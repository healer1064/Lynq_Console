// libraries
import Head from "next/head";

// components
import Content from "@/components/Calls/Template/Content";

const index = () => {
  return (
    <div className="content-wrp">
      <Head>
        <title>Calls Template | Lynq</title>
      </Head>
      <Content />
    </div>
  );
};

export default index;
