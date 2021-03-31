import { useState } from "react";
import TextTruncate from "react-text-truncate";

// styles
import styles from "../../styles/PublicScreen.module.sass";

// components
import PublicScreenMore from "./PublicScreenMore";
import PublicScreenCalendar from "./PublicScreenCalendar";
import PublicScreenDropdown from "./PublicScreenDropdown";

const PublicScreenSessions = ({
  activity,
  data,
  slots,
  onHandle,
  loading,
  handleTime,
  handleNextArrow,
  handlePrevArrow,
}) => {
  const [timeError, setTimeError] = useState(false);
  const [time, setTime] = useState("");
  const [learnMore, setLearnMore] = useState(false);

  const learnToggle = () => setLearnMore(!learnMore);

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
                  <PublicScreenCalendar
                    slots={slots}
                    setTime={setTime}
                    setError={setTimeError}
                    handleNextArrow={handleNextArrow}
                    handlePrevArrow={handlePrevArrow}
                  />
                  {timeError && (
                    <span
                      style={{
                        display: "block",
                        fontSize: "12px",
                        color: "red",
                        marginBottom: "20px",
                      }}
                    >
                      * Select Time
                    </span>
                  )}
                  <button style={{ cursor: "pointer" }} onClick={handleClick}>
                    Book
                  </button>
                </>
              )}
            </>
          )
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img width={50} src="/img/loading.gif" />
          </div>
        )}
      </div>
      {slots !== null && (
        <>
          {activity.material_needed && (
            <div className={styles.needs}>
              <h3>What you need to bring</h3>
              <div>
                <p>{activity.material_needed}</p>
              </div>
            </div>
          )}
          <div className={styles.learn}>
            <h3>What will you learn?</h3>
            <TextTruncate
              line={!learnMore ? 3 : 0}
              element="p"
              truncateText="…"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum
              fringilla adipiscing sed posuere sed null viverra nulla elit.
              fringilla adipiscing sed posuere sed null viverra nulla elit.
              "
              textTruncateChild={
                <PublicScreenMore
                  toggle={learnToggle}
                  label="Read More"
                  state={false}
                />
              }
            />
            {learnMore && (
              <PublicScreenMore
                label="Read Less"
                toggle={learnToggle}
                state={true}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PublicScreenSessions;
