// libraries
import Head from "next/head";

// components
import Content from "@/components/PayperDownload/Single/Content";

const index = () => {
  return (
    <div className='content-wrp'>
      <Head>
        <title>Pay Per Download | Lynq</title>
      </Head>
      <Content />
    </div>
  );
};

export default index;
