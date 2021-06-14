// libraries
import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { toast } from "react-toastify";

// context
import ProfileContext from "@/context/profile";

// requests
import { getProfileReq } from "@/utils/requests/public-profile";

// components
import Content from "@/components/PublicProfile/Content";
import PageLoading from "@/components/common/PageLoading";

const EditProfile = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (token) {
      getProfileReq(token)
        .then((res) => {
          setProfile(res);
        })
        .catch(() => toast.error("Failed to fetch public profile!"));
    }
  }, [token]);

  return (
    <>
      <Head>
        <title>Public Profile | Lynq</title>
      </Head>
      <div className="content-wrp">
        {!profile ? <PageLoading /> : <Content profile={profile} />}
      </div>
    </>
  );
};

export default EditProfile;
