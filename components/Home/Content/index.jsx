// libraries
import { useState, useContext, useEffect } from "react";
import moment from "moment";
import Fade from "react-reveal/Fade";
import Cookies from 'js-cookie'

// stlyes
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// helpers
import { getCurrentWeek } from "@/utils/helpers/dates";

// components
import CurrentSession from "../CurrentSession";
import NextSession from "../NextSession";
import SlugDetails from "../SlugDetails";
import List from "../List";
import Calendar from "../Calendar";
import GlobalPopUp from '../../GlobalPopUp';

const index = ({
  currSession,
  nextSession,
  data,
  onWeekChange,
  refetchResponse,
}) => {
  // context
  const { slugData } = useContext(ProfileContext);

  // states
  const [currWeek, setCurrWeek] = useState(getCurrentWeek());
  const [isEnabled, setisEnabled] = useState(false);

  // handle change
  const handleChange = (_start, _end) => {
    setCurrWeek({ weekStart: _start, weekEnd: _end });
    onWeekChange(_start, _end);
  };

  useEffect(()=>{
    if (!Cookies.get('enable-home-popup')) {
      setisEnabled(true); //Modal does not open if cookie exists
    }
  },[])

  const popupContent = {
    opened: true,
    title: 'First Step',
    content: '<p>Want to start using Lynq but not sure where to begin?</p><p>Check out this short video on the basics, or watch more detailed walkthroughs on our YouTube channel.</p>',
    link: 'https://youtube.com/',
    linkText: 'Watch Video',
    cookieName: 'enable-home-popup'
  }

  return (
    <>
      <div className={styles.main}>
        <CurrentSession currSession={currSession} slugData={slugData} />
        <NextSession nextSession={nextSession} slugData={slugData} />
      </div>
      <Fade duration={1000}>
        <div className={styles.content}>
          <div className={styles.date}>
            <div>
              {moment().format("dddd, MMMM DD YYYY")}
              <h2>Today’s Session</h2>
            </div>
            <SlugDetails slugData={slugData} />
          </div>
          <div className={styles.list}>
            <List list={data} refetchResponse={refetchResponse} />
            <Calendar currDate={currWeek} handleChange={handleChange} />
          </div>
        </div>
        {isEnabled ? <GlobalPopUp content={popupContent} /> : ''}
      </Fade>
    </>
  );
};

export default index;
