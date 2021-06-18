// libraries
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { toast } from "react-toastify";

// context
import ProfileContext from "@/context/profile";

// requests
import { getCallsList } from "@/utils/requests/calendar";

// helpers
import {
  getCurrentDaySessions,
  getHomeCurrentSession,
  getHomeNextSession,
} from "@/utils/helpers";

// components
import PageLoading from "@/components/common/PageLoading";
import Content from "@/components/Home/Content";

const home = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [list, setList] = useState(null);
  const [currSession, setCurrSession] = useState({
    time: null,
    id: null,
  });
  const [nextSession, setNextSession] = useState({
    time: null,
    id: null,
  });

  useEffect(() => {
    if (token) {
      getCallsList(token)
        .then((res) => {
          const arr = getCurrentDaySessions(res);
          setList(arr);
          if (arr.length > 0) {
            getHomeCurrentSession(arr[0].appointments, setCurrSession);
          }
          getHomeNextSession(res, setNextSession);
        })
        .catch(() => {
          toast.error("Failed to get the list!");
        });
    }
  }, [token]);

  return (
    <div className="home-wrp">
      <Head>
        <title>Home | Lynq</title>
      </Head>
      {!list ? (
        <PageLoading />
      ) : (
        <Content
          list={list}
          currSession={currSession}
          nextSession={nextSession}
        />
      )}
    </div>
  );
};

export default home;
