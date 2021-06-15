// libraries
import Head from "next/head";

// components
import Content from "@/components/Settings/Availabilities/Content";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings Availabilities | Lynq</title>
      </Head>
      <div className="content-wrp">
        <Content />
      </div>
    </>
  );
}
