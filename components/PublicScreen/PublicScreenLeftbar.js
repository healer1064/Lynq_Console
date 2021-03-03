import styles from "../../styles/PublicScreen.module.sass";
import PublicScreenMore from "./PublicScreenMore";

const PublicScreenLeftbar = () => {
  return (
    <div className={styles.public_screen_left}>
      <div className={styles.public_screen_head}>
        <div className={styles.public_screen_head_img}>
          <div className={styles.profile_img} />
          <div className={styles.profile_img_online} />
        </div>
        <div className={styles.head_content}>
          <div className={styles.name}>
            <h3>Alex Caruso</h3>
            <span>|</span>
            <p>Los Angeles, CA</p>
            <span>|</span>
            <div>
              <img src="/img/public-screen-facebook.svg" alt="facebook" />
              <img src="/img/public-screen-instagram.svg" alt="instagram" />
              <img src="/img/public-screen-youtube.svg" alt="youtube" />
            </div>
          </div>
          <div className={styles.tags}>
            <p>#Meditation</p>
            <p>#Fitness</p>
            <p>#Yoga</p>
          </div>
        </div>
      </div>
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
