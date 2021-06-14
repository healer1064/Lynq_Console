// libraries
import Head from "next/head";

// components
import Content from "@/components/Support/Content";

const index = () => {
  return (
    <>
      <Head>
        <title>Support | Lynq</title>
      </Head>
      <div className="content-wrp">
        <Content />
      </div>
    </>
  );
};

export default index;
