// libs
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

// context
import ProfileContext from "@/context/profile";

// requests
import { getCalStatusReq } from "@/utils/requests/settings/calendar";

// components
import Content from "@/components/Settings/Calendar/Content";

const SettingsCallSync = () => {
  // contect
  const { profile } = useContext(ProfileContext);
  const [isConnected, setIsConnected] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    if (profile) {
      getCalStatusReq(profile.id)
        .then((res) => {
          console.log(res);
          setIsConnected(res.connected);
          setPageLoading(false);
        })
        .catch(() => {
          setPageLoading(false);
          toast.error("Failed to get calendar status.");
        });
    }
  }, [profile]);

  return (
    <>
      <Head>
        <title>Settings Calendar | Lynq</title>
      </Head>
      <div className='content-wrp'>
        <>
          <Content
            isConnected={isConnected}
            pageLoading={pageLoading}
            profile={profile}
          />
        </>
      </div>
    </>
  );
};

export default SettingsCallSync;
