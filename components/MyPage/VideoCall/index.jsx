// libraries
import React from 'react';
import Grid from "@material-ui/core/Grid";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Switch } from "antd";

// styles
import styles from './styles.module.sass';

// helpers
import { getCurrentWeek } from "@/utils/helpers/dates";

// context
import ProfileContext from "@/context/profile";

// requests
import { getSlotsReq } from '@/utils/requests/settings/availabilities';

// components
import { Tabs } from 'antd';
import Requests from './Requests/Content';
import Template from './Template/Content';
import Calendar from '@/components/Settings/Calendar/Content';
import Table from '@/components/Settings/Availabilities/Table';
import Notifications from '@/components/Settings/Availabilities/Notifications';
import List from "./List";
import CallCalendar from "./CallCalendar";

const index = ({ 
  isConnected,
  pageLoading,
  profile,
  activePrivateSession,
  list,
  callData,
  onWeekChange,
  refetchResponse,
}) => {
  // states
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [state, setState] = useState(false);
  const [title, setTitle] = useState("");
  // const [hide, setHide] = useState(false);
  const [currWeek, setCurrWeek] = useState(getCurrentWeek());

  // context
  const { token, slugData } = useContext(ProfileContext);

  const handleChange = (checked) => {
    setState(checked);
  };

  const handleDateChange = (_start, _end) => {
    setCurrWeek({ weekStart: _start, weekEnd: _end });
    onWeekChange(_start, _end);
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
          {/* <btn class={styles.hide} onClick={() => setHide(!hide)}>
            { hide ? "Hide >>" : "<< Template" }
          </btn> */}
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Set Up' key='1'>
              <div className={styles.title_div}>
                <Switch
                  checked={state}
                  onChange={handleChange}
                  style={{
                    borderRadius: "50px",
                    padding: "0",
                    margin: "0",
                    backgroundColor: "rgba(0, 0, 0, 0.25)",
                  }}
                />
                <div className={styles.col_div}>
                  <label>Title of the block *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <Template activePrivateSession={activePrivateSession} />
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
            <TabPane tab='Calendar' key='2'>
              <CallCalendar currDate={currWeek} handleChange={handleDateChange} />
              <List list={callData} refetchResponse={refetchResponse} />
              <Requests list={list} />
            </TabPane>
          </Tabs>
        </div>
      </Grid>
    </Grid>
  );
};

export default index;
