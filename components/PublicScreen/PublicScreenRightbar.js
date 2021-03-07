import { useState } from "react";
import useSWR from "swr";

import styles from "../../styles/PublicScreen.module.sass";
import PublicScreenDropdown from "./PublicScreenDropdown";

// components
import PublicScreenMore from "./PublicScreenMore";
import PublicScreen2Calendar from "./PublicScreen2Calendar";

// utils
import fetcher from "../../utils/fetcher";

const PublicScreenRightbar = ({ data }) => {
  const [activity, setActicity] = useState(null);

  // const { data: result, error } = useSWR(
  //   [
  //     activity !== null ? "/api/profile-availability" : null,
  //     activity !== null
  //       ? {
  //           test: "hello from avaialv",
  //         }
  //       : null,
  //   ],
  //   fetcher
  // );

  const handleActivity = (_activity) => {
    setActicity(_activity);
  };

  return (
    <div className={styles.public_screen2_right}>
      <div className={styles.book_session}>
        <h3>Book a session</h3>
        <PublicScreenDropdown data={data} onHandle={handleActivity} />
        {activity !== null && (
          <>
            <div className={styles.info}>
              <h6>
                Length: <span>{activity.duration}</span>
              </h6>
              <h6>
                Price: <span>{activity.price}</span>
              </h6>
            </div>
            <PublicScreen2Calendar />
            <button>Book</button>
          </>
        )}
      </div>
      {activity !== null && (
        <>
          <div className={styles.needs}>
            <h3>What you need to bring</h3>
            <div>
              <p>Yoga mattress</p>
              <p>Dumbbells</p>
              <p>Whatelse?</p>
            </div>
          </div>
          <div className={styles.learn}>
            <h3>What will you learn?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum
              fringilla adipiscing sed posuere sed null viverra nulla elit.{" "}
            </p>
            <PublicScreenMore />
          </div>
        </>
      )}
    </div>
  );
};

export default PublicScreenRightbar;
