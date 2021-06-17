// libraries
import React from "react";

// stlyes
import styles from "./styles.module.sass";

const index = ({ currSession, slugData }) => {
  return (
    currSession.time !== null &&
    slugData !== null && (
      <div className={styles.session}>
        <span>
          Current live session
          {currSession.name == null && " | From google calender"}|{" "}
          {currSession.time}
        </span>
        {currSession.name !== null && (
          <a
            href={`https://us.lynq.app/${slugData.slug}/teacher/${currSession.id}`}
            className={styles.access_live}
            target="_blank"
          >
            ACCESS THE LIVE
          </a>
        )}
      </div>
    )
  );
};

export default index;
