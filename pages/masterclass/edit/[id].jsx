// libraries
import Head from "next/head";

// components
import Content from "@/components/Masterclass/Edit/Content";

const index = () => {
  return (
    <div className='content-wrp'>
      <Head>
        <title>New Masterclass | Lynq</title>
      </Head>
      <Content />
    </div>
  );
};

export default index;
