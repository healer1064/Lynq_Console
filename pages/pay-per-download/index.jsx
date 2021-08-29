// libraries
// import { useState, useContext, useEffect } from "react";
import Head from "next/head";
// import { toast } from "react-toastify";

// context
import ProfileContext from "@/context/profile";

// utils
// import { getMasterclass } from "@/utils/requests/masterclass";

// components
// import PageLoading from "@/components/common/PageLoading";
import Content from "@/components/PayperDownload/Content";

const index = () => {
  // context
  //   const { token } = useContext(ProfileContext);

  // states
  //   const [masterclasses, setMasterclasses] = useState(null);

  //   useEffect(() => {
  //     if (token) {
  //       getMasterclass(token)
  //         .then((res) => {
  //           if (res.error) {
  //             toast.error("Failed to get masterclasses.");
  //           } else {
  //             setMasterclasses(res);
  //           }
  //         })
  //         .catch(() => toast.error("Failed to get masterclasses."));
  //     }
  //   }, [token]);

  return (
    <div className='content-wrp'>
      <Head>
        <title>Pay Per Download | Lynq</title>
      </Head>
      {/* {!masterclasses ? <PageLoading /> :  */}
      <Content />
      {/* //   list={masterclasses} />} */}
    </div>
  );
};

export default index;
