// libraries
import React, { useState, useContext, useEffect } from 'react';

// context
import ProfileContext from '@/context/profile';

// requests
import { getSlotsReq } from '@/utils/requests/settings/availabilities';

// components
import { Tabs } from 'antd';
import Requests from '@/components/Calls/Requests/Content';
import Template from '@/components/Calls/Template/Content';
import Calendar from '@/components/Settings/Calendar/Content';
import Table from '@/components/Settings/Availabilities/Table';
import Notifications from '@/components/Settings/Availabilities/Notifications';

const index = ({
  isConnected,
  pageLoading,
  profile,
  activePrivateSession,
  list,
}) => {
  // states
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);

  // context
  const { token, slugData } = useContext(ProfileContext);

  // tabs pane
  const { TabPane } = Tabs;

  useEffect(() => {
    if (token) {
      getSlotsReq(token)
        .then((res) => {
          setData(res);
        })
        .catch(() => toast.error('Failed to get availabilities slots.'));
    }
  }, [token, success]);

  const toggleSuccess = () => {
    setSuccess((prevState) => !prevState);
  };

  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='Requests' key='1'>
        <Requests list={list} />
      </TabPane>
      <TabPane tab='Template' key='2'>
        <Template activePrivateSession={activePrivateSession} />
      </TabPane>
      <TabPane tab='Calendar' key='3'>
        <Table
          data={data && data.filter((i) => i.start !== null && i.end !== null)}
          toggleSuccess={toggleSuccess}
          success={success}
        />
        <Notifications
          data={slugData}
          delayedBookingHours={slugData.delay_booking_hours}
          token={token}
          toggleSuccess={toggleSuccess}
        />
        <Calendar
          isConnected={isConnected}
          pageLoading={pageLoading}
          profile={profile}
        />
      </TabPane>
    </Tabs>
  );
};

export default index;
