import styles from "../../styles/PublicScreen.module.sass";

const PublicScreenHead = () => {
  return (
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
  );
};

export default PublicScreenHead;
