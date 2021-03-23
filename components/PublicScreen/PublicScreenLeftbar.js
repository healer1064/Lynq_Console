// styles
import styles from "../../styles/PublicScreen.module.sass";

// components
import PublicScreenHead from "./PublicScreenHead";
import PublicScreenMore from "./PublicScreenMore";

const PublicScreenLeftbar = ({ profile }) => {
  return (
    <div className={styles.public_screen_left}>
      <PublicScreenHead data={profile} />
      <div className={styles.public_screen_body}>
        <h3>About:</h3>
        <p>{profile.about}</p>
        <PublicScreenMore />
        <h3>What to expect:</h3>
        <p>{profile.expect_details}</p>
        <PublicScreenMore />
        {profile.speciality.length > 0 && (
          <>
            <h3>Specialities</h3>
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
        )}
      </div>
    </div>
  );
};

export default PublicScreenLeftbar;
