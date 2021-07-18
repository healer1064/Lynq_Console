// libraries
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { toast } from "react-toastify";

// context
import ProfileContext from "@/context/profile";

// utils
import { getMessageTemplate } from "@/utils/requests/messages";

// components
import Content from "@/components/Messages/Template/Content";
import PageLoading from "@/components/common/PageLoading";

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(false);

  // get template
  useEffect(() => {
    if (token) {
      getMessageTemplate(token)
        .then((res) => {
          if (res.status) {
            toast.error("Failed to get message template.");
          } else {
            setData(res);
          }
        })
        .catch(() => toast.error("Failed to get message template."));
    }
  }, [token, response]);

  // refetch response
  const responseRefresh = () => {
    setResponse(!response);
  };

  console.log(data);

  return (
    <div className='content-wrp'>
      <Head>
        <title>Messages Template | Lynq</title>
      </Head>
      {data ? (
        <Content data={data.content} responseRefresh={responseRefresh} />
      ) : (
        <PageLoading />
      )}
    </div>
  );
};

export default index;
