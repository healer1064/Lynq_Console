import styles from "../../styles/PublicScreen.module.sass";

const PublicScreenButton = ({ text }) => {
  return <button className={styles.public_screen_button}>{text}</button>;
};

export default PublicScreenButton;
