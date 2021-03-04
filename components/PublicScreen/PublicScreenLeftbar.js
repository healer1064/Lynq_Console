// styles
import styles from "../../styles/PublicScreen.module.sass";

// components
import PublicScreenHead from "./PublicScreenHead";
import PublicScreenMore from "./PublicScreenMore";

const PublicScreenLeftbar = () => {
  return (
    <div className={styles.public_screen_left}>
      <PublicScreenHead />
      <div className={styles.public_screen_body}>
        <h3>About:</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum
          fringilla adipiscing sed posuere sed null viverra nulla elit. Volutpat
          sagittis orci arcu parturient purus aliquam dictumst elit. Tempus,
          libero ipsum viverra mauris fusce ac volutpat, iaculis sit. adipi
        </p>
        <PublicScreenMore />
        <h3>What to expect:</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum
          fringilla adipiscing sed posuere sed null viverra nulla elit. Volutpat
          sagittis orci arcu parturient purus aliquam dictumst elit. Tempus,
          libero ipsum viverra mauris fusce ac volutpat, iaculis sit. adipi
        </p>
        <PublicScreenMore />
        <h3>Specialities</h3>
        <div className={styles.specialities}>
          <div>
            <img src="/img/public-screen-speciality.svg" alt="speciality" />
            <p>Fitness</p>
          </div>
          <div>
            <img src="/img/public-screen-speciality.svg" alt="speciality" />
            <p>Fitness</p>
          </div>
          <div>
            <img src="/img/public-screen-speciality.svg" alt="speciality" />
            <p>Weight Loss</p>
          </div>
          <div>
            <img src="/img/public-screen-speciality.svg" alt="speciality" />
            <p>Weight Loss</p>
          </div>
          <div>
            <img src="/img/public-screen-speciality.svg" alt="speciality" />
            <p>Dance</p>
          </div>
          <div>
            <img src="/img/public-screen-speciality.svg" alt="speciality" />
            <p>Dance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicScreenLeftbar;
