// libraries
import Head from "next/head";

// components
import Content from "@/components/MyPage/ExclusiveContent/New/Content";

const index = () => {
  return (
    <div className='content-wrp'>
      <Head>
        <title>Exclusive Content | Lynq</title>
      </Head>
      <Content />
    </div>
  );
};

export default index;
