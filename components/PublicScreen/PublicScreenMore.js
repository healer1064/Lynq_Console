import styles from "../../styles/PublicScreen.module.sass";

const PublicScreenMore = () => {
  return (
    <div className={styles.more}>
      <span>Read More</span>
      <img src="/img/public-screen-more.svg" alt="more" />
    </div>
  );
};

export default PublicScreenMore;
