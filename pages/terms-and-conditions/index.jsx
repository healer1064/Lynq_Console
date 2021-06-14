// libraries
import { useEffect } from "react";
import Head from "next/head";

// components
import Content from "@/components/Terms&Conditions/Content";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Head>
        <title>Terms & Conditions | Lynq</title>
      </Head>
      <Content />;
    </div>
  );
};

export default Terms;
