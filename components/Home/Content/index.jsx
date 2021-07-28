// libraries
import { useState, useContext } from "react";
import moment from "moment";
import Fade from "react-reveal/Fade";

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

  // handle change
  const handleChange = (_start, _end) => {
    setCurrWeek({ weekStart: _start, weekEnd: _end });
    onWeekChange(_start, _end);
  };

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
      </Fade>
    </>
  );
};

export default index;
