// libraries
import Head from "next/head";

// components
import Content from "@/components/Messages/Conversations/Content";

const index = () => {
  return (
    <div className="full-wrp">
      <Head>
        <title>Messages Conversations | Lynq</title>
      </Head>
      <Content />
    </div>
  );
};

export default index;
