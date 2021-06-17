// libraries
import { useContext } from "react";
import moment from "moment";
import Fade from "react-reveal/Fade";

// stlyes
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// components
import CurrentSession from "../CurrentSession";
import NextSession from "../NextSession";
import SlugDetails from "../SlugDetails";
import List from "../List";
import Onboarding from "../Onboarding";

const index = ({ list, currSession, nextSession }) => {
  // context
  const { slugData } = useContext(ProfileContext);

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
          <List list={list} />
        </div>
      </Fade>
      {!localStorage.getItem("lynqOnboarding") && <Onboarding />}
    </>
  );
};

export default index;
