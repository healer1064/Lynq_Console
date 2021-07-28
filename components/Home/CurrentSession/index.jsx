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
          Current {currSession.type}
          {currSession.name == null && " | From google calender"}|{" "}
          {currSession.time}
        </span>
        {currSession.name !== null && (
          <a
            href={
              currSession.type == "Masterclass"
                ? `https://lynq.app/${slugData.slug}/ex/masterclass/${currSession.id}`
                : `https://lynq.app/${slugData.slug}/ex/one-to-one/${currSession.id}`
            }
            className={styles.access_live}
            target='_blank'
          >
            ACCESS THE {currSession.type.toUpperCase()}
          </a>
        )}
      </div>
    )
  );
};

export default index;
