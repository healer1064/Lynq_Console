// libraries
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { toast } from "react-toastify";

// context
import ProfileContext from "@/context/profile";

// requests
import { getAsyncReq } from "@/utils/requests/messages";

// components
import Content from "@/components/Messages/Conversations/Content";
import PageLoading from "@/components/common/PageLoading";

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [list, setList] = useState(null);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    if (token) {
      getAsyncReq(token)
        .then((res) => setList(res.content))
        .catch(() => toast.error("Failed to get messages list!"));
    }
  }, [token, response]);

  // refresh response
  const refreshResponse = () => {
    setResponse((prevState) => !prevState);
  };

  return (
    <div className='full-wrp'>
      <Head>
        <title>Messages Conversations | Lynq</title>
      </Head>
      {list ? (
        <Content list={list} refreshResponse={refreshResponse} />
      ) : (
        <PageLoading />
      )}
    </div>
  );
};

export default index;
