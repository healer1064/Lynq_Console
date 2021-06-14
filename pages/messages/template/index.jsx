// libraries
import Head from "next/head";

// components
import Content from "@/components/Messages/Template/Content";

const index = () => {
  return (
    <div className="content-wrp">
      <Head>
        <title>Messages Template | Lynq</title>
      </Head>
      <Content />
    </div>
  );
};

export default index;
