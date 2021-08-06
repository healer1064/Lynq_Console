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
          Next {nextSession.type}
          {nextSession.name == null && " | From google calender"}|{" "}
          {nextSession.time}
        </span>
        {nextSession.name !== null && (
          <a
            href={
              nextSession.type == "Masterclass"
                ? `https://lynq.app/${slugData?.slug}/ex/masterclass/${nextSession.id}?role=expert`
                : `https://lynq.app/${slugData?.slug}/ex/one-to-one/${nextSession.id}`
            }
            className={styles.start_live}
            target='blank'
          >
            START THE {nextSession.type.toUpperCase()}
          </a>
        )}
      </div>
    )
  );
};

export default index;
