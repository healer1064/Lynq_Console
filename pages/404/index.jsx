// libraries
import Head from "next/head";

// components
import Content from "@/components/404/Content";

const ErrorPage = () => {
  return (
    <>
      <Head>
        <title>404 - Page not found | Lynq</title>
      </Head>
      <Content />
    </>
  );
};

export default ErrorPage;
