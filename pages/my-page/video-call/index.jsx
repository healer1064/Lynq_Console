// libraries
import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format } from "date-fns";

// context
import ProfileContext from '@/context/profile';

// requests
import { getRequestReq } from '@/utils/requests/calls/requests';
import { getCalStatusReq } from '@/utils/requests/settings/calendar';
import { getCallsList } from "@/utils/requests/calendar";
import { getMasterclass } from "@/utils/requests/masterclass";

// components
import PageLoading from '@/components/common/PageLoading';
import Content from '@/components/MyPage/VideoCall';

// helper
import {
  groupListInSectionsByDate
} from "@/utils/helpers";
import { compareDates, filterByCurrWeek } from "@/utils/helpers/dates";

const index = () => {
  // context
  const { token, profile, slugData } = useContext(ProfileContext);

  // states
  const [requests, setRequests] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [activePrivateSession, setActivePrivateSession] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [data, setData] = useState(null);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    if (token) {
      getRequestReq(token)
        .then((res) => {
          setRequests(res);
        })
        .catch(() => {
          toast.error('Failed to get call requests!');
        });
    }
  }, [token]);

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
          toast.error('Failed to get calendar status.');
        });
    }
  }, [profile]);

  useEffect(() => {
    if (slugData) {
      setActivePrivateSession(slugData.active_private_session);
    }
  }, [slugData]);

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
              }
            })
            .catch(() => toast.error("Failed to get the list."));
        })
        .catch(() => {
          toast.error("Failed to get the list!");
        });
    }
  }, [token, refetch]);

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
    <>
      <Head>
        <title>1-on-1 video call | Lynq</title>
      </Head>
      <div className='content-wrp '>
        {!requests || !data? (
          <PageLoading />
        ) : (
          <Content
            list={requests}
            isConnected={isConnected}
            pageLoading={pageLoading}
            profile={profile}
            activePrivateSession={activePrivateSession}
            callData={data}
            onWeekChange={onWeekChange}
            refetchResponse={refetchResponse}
          />
        )}
      </div>
    </>
  );
}

export default index;