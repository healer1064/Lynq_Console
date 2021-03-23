import styles from "../../styles/PublicScreen.module.sass";

const PublicScreenHead = ({ data }) => {
  return (
    <div className={styles.public_screen_head}>
      <div className={styles.public_screen_head_img}>
<<<<<<< Updated upstream
        <img src={data.public_image} className={styles.profile_img} />
=======
        {data.public_image ? (
          <img
            src={data.public_image}
            alt={data.name}
            className={styles.profile_img}
          />
        ) : (
          <div className={styles.profile_img}>{data.name[0]}</div>
        )}
>>>>>>> Stashed changes
        <div className={styles.profile_img_online} />
      </div>
      <div className={styles.head_content}>
        <div className={styles.name}>
          <h3>{data.name}</h3>
          <span>|</span>
          <p>{data.location}</p>
          <span>|</span>
          <div>
            <a href={data.facebook} target="_blank">
              <img src="/img/public-screen-facebook.svg" alt="facebook" />
            </a>
            <a href={data.instagram} target="_blank">
              <img src="/img/public-screen-instagram.svg" alt="instagram" />
            </a>
            <a href={data.youtube} target="_blank">
              <img src="/img/public-screen-youtube.svg" alt="youtube" />
            </a>
          </div>
        </div>
        <div className={styles.tags}>
          {JSON.parse(data.category).map((item) => (
            <p>#{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicScreenHead;
