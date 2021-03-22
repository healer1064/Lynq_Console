import { useState } from "react";
import styles from "../../styles/PublicScreen.module.sass";
import PublicScreenDropdown from "./PublicScreenDropdown";

// components
import PublicScreenMore from "./PublicScreenMore";
import PublicScreen2Calendar from "./PublicScreen2Calendar";

const PublicScreenRightbar = ({
  activity,
  data,
  slots,
  onHandle,
  loading,
  handleTime,
}) => {
  const [timeError, setTimeError] = useState(false);
  const [time, setTime] = useState("");

  const handleClick = () => {
    if (time !== "") {
      handleTime(time);
      setTimeError(false);
    } else {
      setTimeError(true);
    }
  };

  return (
    <div className={styles.public_screen2_right}>
      <div className={styles.book_session}>
        <h3>Book a session</h3>
        <PublicScreenDropdown data={data} onHandle={onHandle} />
        {!loading ? (
          slots !== null && (
            <>
              <div className={styles.info}>
                <h6>
                  Length: <span>{activity.duration} min</span>
                </h6>
                <h6>
                  Price: <span>${activity.price}</span>
                </h6>
              </div>
              {slots !== undefined && (
                <>
                  <PublicScreen2Calendar
                    slots={slots}
                    setTime={setTime}
                    setError={setTimeError}
                  />
                  <button onClick={handleClick}>Book</button>
                  {timeError && (
                    <span
                      style={{
                        fontSize: "12px",
                        color: "red",
                      }}
                    >
                      * Select Time
                    </span>
                  )}
                </>
              )}
            </>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {slots !== null && (
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
