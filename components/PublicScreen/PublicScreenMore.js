import styles from "../../styles/PublicScreen.module.sass";

const PublicScreenMore = ({ toggle, label, state }) => {
  return (
    <span className={styles.more} onClick={toggle}>
      <span>{label}</span>
      <img
        style={{ transform: `${state && "rotate(180deg)"}` }}
        src="/img/public-screen-more.svg"
        alt="more"
      />
    </span>
  );
};

export default PublicScreenMore;
