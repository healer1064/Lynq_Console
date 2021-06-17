// libraries
import Countdown from "react-countdown";

// styles
import styles from "./styles.module.sass";

// helpers
import { timeDifferenceInMilliSeconds } from "@/utils/helpers";

const index = ({ date }) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <p className={styles.countdown_completed}>Exceeded Time</p>;
    } else {
      return (
        <div className={styles.countdown}>
          <p>Due in: </p>
          <p>{hours}</p>
          <span>:</span>
          <p>{minutes.length < 2 ? `0${minutes}` : minutes}</p>
          <span>:</span>
          <p>{seconds}</p>
        </div>
      );
    }
  };

  return (
    <Countdown
      date={Date.now() + timeDifferenceInMilliSeconds(date)}
      renderer={renderer}
    />
  );
};

export default index;
