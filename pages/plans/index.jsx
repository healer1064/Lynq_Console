// libraries
import Head from "next/head";

// components
import PlansNavbar from "@/components/Plans/Navbar";
import Content from "@/components/Plans/Content";

export default function Home() {
  return (
    <>
      <Head>
        <title>Plans | Lynq</title>
      </Head>
      <PlansNavbar />
      <Content />
    </>
  );
}
