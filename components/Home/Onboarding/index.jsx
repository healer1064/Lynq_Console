import { useState } from "react";

// styles
import styles from "./styles.module.sass";

const Onboarding = () => {
  // states
  const [index, setIndex] = useState(1);
  const [done, setDone] = useState(false);

  return (
    <div
      style={{ display: done ? "none" : "flex" }}
      className={styles.onboarding}
    >
      <div className={styles.main}>
        <img
          src={
            index == 1
              ? "/img/gears.png"
              : index == 2
              ? "/img/user.png"
              : "/img/rocket.png"
          }
          alt="onboarding"
        />
        <div className={styles.mid}>
          {index == 1 ? (
            <h3 className={styles.heading}>Step 1: Set up the basics</h3>
          ) : index == 2 ? (
            <h3 className={styles.heading}>Step 2: Your public profile</h3>
          ) : null}

          {index == 1 ? (
            <p className={styles.para}>
              You need to go through this step before starting
            </p>
          ) : index == 2 ? (
            <p className={styles.para}>This is the page you will share</p>
          ) : null}

          {index == 1 ? (
            <div>
              <p>Go To Settings</p>
              <p>1. Define your weekly availabilities</p>
              <p>2. Create the event types you want to propose</p>
              <p>3. Sync with your Google Calendar (optional)</p>
            </div>
          ) : index == 2 ? (
            <div>
              <p>Go To Public Profile</p>
              <p>1. Customize your URL</p>
              <p>2. Describe your activity and skills</p>
              <p></p>
            </div>
          ) : (
            <div>
              <p>
                You are now ready to start and share your Lynq with the rest of
                the world
              </p>
              <p>
                Find more about activities and the rest of the platform in this
                video
              </p>
              <button
                onClick={() => {
                  localStorage.setItem("lynqOnboarding", true);
                  setDone(true);
                }}
              >
                Start
              </button>
            </div>
          )}
        </div>
        <div className={styles.navigate}>
          <span
            style={{ background: index == 1 ? "#7E88F4" : "#ccc" }}
            onClick={() => setIndex(1)}
          ></span>
          <span
            style={{ background: index == 2 ? "#7E88F4" : "#ccc" }}
            onClick={() => setIndex(2)}
          ></span>
          <span
            style={{ background: index == 3 ? "#7E88F4" : "#ccc" }}
            onClick={() => setIndex(3)}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
