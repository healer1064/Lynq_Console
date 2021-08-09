// libraries
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { format } from "date-fns";
import { toast } from "react-toastify";

// context
import ProfileContext from "@/context/profile";

// requests
import { getCallsList } from "@/utils/requests/calendar";
import { getMasterclass } from "@/utils/requests/masterclass";

// helpers
import {
  getCurrentDaySessions,
  getHomeCurrentSession,
  getHomeNextSession,
  groupListInSectionsByDate,
} from "@/utils/helpers";
import { compareDates, filterByCurrWeek } from "@/utils/helpers/dates";

// components
import PageLoading from "@/components/common/PageLoading";
import Content from "@/components/Home/Content";

// mockup
import mockup from "@/utils/data";

const home = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [refetch, setRefetch] = useState(false);
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
        .then((calls) => {
          getMasterclass(token)
            .then((masterclasses) => {
              if (masterclasses.error) {
                toast.error("Failed to get the list.");
              } else {
                const res = calls.concat(masterclasses);
                res.sort(compareDates);
                setData(filterByCurrWeek(groupListInSectionsByDate(res)));
                setTemp(groupListInSectionsByDate(res));
                const arr = getCurrentDaySessions(res);
                if (arr.length > 0) {
                  getHomeCurrentSession(arr[0].appointments, setCurrSession);
                }
                getHomeNextSession(res, setNextSession);
              }
            })
            .catch(() => toast.error("Failed to get the list."));
        })
        .catch(() => {
          toast.error("Failed to get the list!");
        });
    }
  }, [token, refetch]);

  // mockup test
  // useEffect(() => {
  //   let res = mockup.masterclasses;
  //   setData(filterByCurrWeek(groupListInSectionsByDate(res)));
  //   setTemp(groupListInSectionsByDate(res));
  //   const arr = getCurrentDaySessions(res);
  //   if (arr.length > 0) {
  //     getHomeCurrentSession(arr[0].appointments, setCurrSession);
  //   }
  //   getHomeNextSession(res, setNextSession);
  // }, []);

  const onWeekChange = (_start, _end) => {
    _start = format(_start, "yyyy-MM-dd");
    _end = format(_end, "yyyy-MM-dd");

    let filter = temp.filter(
      (item) =>
        new Date(item.date).getTime() >= new Date(_start).getTime() &&
        new Date(item.date).getTime() <= new Date(_end).getTime()
    );
    setData(filter);
  };

  // refetch response
  const refetchResponse = () => {
    setRefetch((prevState) => !prevState);
  };

  return (
    <div className="home-wrp">
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
          refetchResponse={refetchResponse}
        />
      )}
    </div>
  );
};

export default home;
