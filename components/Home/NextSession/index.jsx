// libraries
import React from "react";

// styles
import styles from "./styles.module.sass";

const index = ({ nextSession, slugData }) => {
  return (
    nextSession.time !== null &&
    slugData !== null && (
      <div className={styles.session}>
        <span>
          Next Session
          {nextSession.name == null && " | From google calender"}|{" "}
          {nextSession.time}
        </span>
        {nextSession.name !== null && (
          <a
            href={`https://us.lynq.app/${slugData?.slug}/teacher/${nextSession.id}`}
            className={styles.start_live}
            target="blank"
          >
            START THE LIVE
          </a>
        )}
      </div>
    )
  );
};

export default index;
