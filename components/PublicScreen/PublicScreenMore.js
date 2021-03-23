import styles from "../../styles/PublicScreen.module.sass";

const PublicScreenMore = ({ toggle, label }) => {
  return (
    <div className={styles.more} onClick={toggle}>
      <span>{label}</span>
      <img src="/img/public-screen-more.svg" alt="more" />
    </div>
  );
};

export default PublicScreenMore;
