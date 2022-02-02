// libraries
import React from 'react';
import Grid from "@material-ui/core/Grid";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Switch } from "@material-ui/core";

// styles
import styles from './styles.module.sass';

// context
import ProfileContext from "@/context/profile";

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
  const [state, setState] = useState(false);
  const [hide, setHide] = useState(false);

  // context
  const { token, slugData } = useContext(ProfileContext);

  const handleChange = event => {
    setState(event.target.checked);
  };
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
    <Grid container spacing={1} className={styles.video_call_wrap}>
      <Grid item xs={12} sm={12} md={12}>        
        <Link href={`/my-page`}>
          <div className={styles.back_btn_div}>
            <img src="/svg/arrow-back.svg" alt="arrow-back"/>
            <p>1-on-1 Video Call</p>
          </div>
        </Link>
        <div className={styles.profile_div}>
          <btn class={styles.hide} onClick={() => setHide(!hide)}>
            { hide ? "Hide >>" : "<< Template" }
          </btn>
          {/* <Switch
            checked={state}
            onChange={handleChange}
            value={state}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <div className={styles.col_div}>
            <label>Title of the block *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div> */}
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
                delayedBookingHours={slugData?.delay_booking_hours}
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
        </div>
      </Grid>
    </Grid>
  );
};

export default index;
