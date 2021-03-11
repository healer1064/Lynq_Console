import styles from "../../styles/PublicScreen.module.sass";

const PublicScreenButton = ({ text, ...props }) => {
  return (
    <button {...props} className={styles.public_screen_button}>
      {text}
    </button>
  );
};

export default PublicScreenButton;
