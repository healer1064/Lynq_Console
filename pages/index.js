// libraries
import Head from "next/head";

// components
import Navbar from "../components/Navbar";
import Plans from "../components/Plans/Plans";

export default function Home() {
  return (
    <>
      <Head>
        <title>Plans</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <Plans />
    </>
  );
}
