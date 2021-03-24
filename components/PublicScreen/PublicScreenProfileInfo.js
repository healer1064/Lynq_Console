import { useState } from "react";
import TextTruncate from "react-text-truncate";

// styles
import styles from "../../styles/PublicScreen.module.sass";

// components
import PublicScreenHead from "./PublicScreenHead";
import PublicScreenMore from "./PublicScreenMore";

const PublicScreenProfileInfo = ({ profile }) => {
  const [aboutMore, setAboutMore] = useState(false);
  const [expectMore, setExceptMore] = useState(false);

  const aboutToggle = () => setAboutMore(!aboutMore);
  const expectToggle = () => setExceptMore(!expectMore);

  return (
    <div className={styles.public_screen_left}>
      <PublicScreenHead data={profile} />
      <div className={styles.public_screen_body}>
        {profile.about && (
          <>
            <h3>About:</h3>
            <TextTruncate
              line={!aboutMore ? 5 : 0}
              element="p"
              truncateText="…"
              text={profile.about}
              textTruncateChild={
                <PublicScreenMore
                  toggle={aboutToggle}
                  label="Read More"
                  state={false}
                />
              }
            />
            {aboutMore && (
              <PublicScreenMore
                label="Read Less"
                toggle={aboutToggle}
                state={true}
              />
            )}
          </>
        )}
        {profile.expect_details && (
          <>
            <h3 style={{ marginTop: "2rem" }}>What to expect:</h3>
            <TextTruncate
              line={!expectMore ? 5 : 0}
              element="p"
              truncateText="…"
              text={profile.expect_details}
              textTruncateChild={
                <PublicScreenMore
                  toggle={expectToggle}
                  label="Read More"
                  state={false}
                />
              }
            />
            {expectMore && (
              <PublicScreenMore
                label="Read Less"
                toggle={expectToggle}
                state={true}
              />
            )}
          </>
        )}
        {/* {profile.speciality.length > 0 && (
          <>
            <h3 style={{ marginTop: "2rem" }}>Specialities</h3>
            <div className={styles.specialities}>
              {profile.speciality.map((item, i) => (
                <div key={i}>
                  <img
                    src="/img/public-screen-speciality.svg"
                    alt="speciality"
                  />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </>
        )} */}
      </div>
    </div>
  );
};

export default PublicScreenProfileInfo;
