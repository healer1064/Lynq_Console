// libraries
import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

// context
import ProfileContext from '@/context/profile';

// requests
import { getRequestReq } from '@/utils/requests/calls/requests';
import { getCalStatusReq } from '@/utils/requests/settings/calendar';

// components
import PageLoading from '@/components/common/PageLoading';
import Content from '@/components/MyPage/VideoCall';

const index = () => {
  // context
  const { token, profile, slugData } = useContext(ProfileContext);

  // states
  const [requests, setRequests] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [activePrivateSession, setActivePrivateSession] = useState(false);

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

  return (
    <>
      <Head>
        <title>1-on-1 video call | Lynq</title>
      </Head>
      <div className='content-wrp '>
        {!requests ? (
          <PageLoading />
        ) : (
          <Content
            list={requests}
            isConnected={isConnected}
            pageLoading={pageLoading}
            profile={profile}
            activePrivateSession={activePrivateSession}
          />
        )}
      </div>
    </>
  );
}

export default index;