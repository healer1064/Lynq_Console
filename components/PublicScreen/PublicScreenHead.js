import styles from "../../styles/PublicScreen.module.sass";

const PublicScreenHead = ({ data }) => {
  return (
    <div className={styles.public_screen_head}>
      <div className={styles.public_screen_head_img}>
        {data.public_image ? (
          <img
            src={data.public_image}
            alt={data.name}
            className={styles.profile_img}
          />
        ) : (
          <div className={styles.profile_img}>{data.name[0]}</div>
        )}
        <div className={styles.profile_img_online} />
      </div>
      <div className={styles.head_content}>
        <div className={styles.name}>
          {data.name && <h3>{data.name}</h3>}
          {data.location && (
            <>
              <span>|</span>
              <p>{data.location}</p>
            </>
          )}
          {(data.facebook || data.instagram || data.youtube) && (
            <>
              <span>|</span>
              <div>
                {data.facebook && (
                  <a href={data.facebook} target="_blank">
                    <img src="/img/public-screen-facebook.svg" alt="facebook" />
                  </a>
                )}
                {data.instagram && (
                  <a href={data.instagram} target="_blank">
                    <img
                      src="/img/public-screen-instagram.svg"
                      alt="instagram"
                    />
                  </a>
                )}
                {data.youtube && (
                  <a href={data.youtube} target="_blank">
                    <img src="/img/public-screen-youtube.svg" alt="youtube" />
                  </a>
                )}
              </div>
            </>
          )}
        </div>
        {data.category && (
          <div className={styles.tags}>
            {JSON.parse(data.category).map((item, index) => (
              <p key={index}>#{item}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicScreenHead;
