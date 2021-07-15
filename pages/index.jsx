// libraries
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { format } from "date-fns";
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
  groupListInSectionsByDate,
} from "@/utils/helpers";
import { filterByCurrWeek } from "@/utils/helpers/dates";

// components
import PageLoading from "@/components/common/PageLoading";
import Content from "@/components/Home/Content";

const home = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);
  const [temp, setTemp] = useState([]);
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
          setData(filterByCurrWeek(groupListInSectionsByDate(res)));
          setTemp(groupListInSectionsByDate(res));
          const arr = getCurrentDaySessions(res);
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

  const onWeekChange = (_start, _end) => {
    _start = format(_start, "yyyy-MM-dd");
    _end = format(_end, "yyyy-MM-dd");

    let filter = temp.filter(
      (item) =>
        new Date(item.date).getTime() >= new Date(_start).getTime() &&
        new Date(item.date).getTime() <= new Date(_end).getTime(),
    );
    setData(filter);
  };

  return (
    <div className='home-wrp'>
      <Head>
        <title>Home | Lynq</title>
      </Head>
      {!data ? (
        <PageLoading />
      ) : (
        <Content
          currSession={currSession}
          nextSession={nextSession}
          data={data}
          onWeekChange={onWeekChange}
        />
      )}
    </div>
  );
};

export default home;
