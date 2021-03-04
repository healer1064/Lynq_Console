import styles from "../../styles/PublicScreen.module.sass";
import PublicScreenDropdown from "./PublicScreenDropdown";

const arr = ["Select the type of session", "Select the type of session"];

const PublicScreenRightbar = () => {
  return (
    <div className={styles.public_screen_right}>
      <div className={styles.book_session}>
        <h3>Book a session</h3>
        <PublicScreenDropdown data={arr} />
      </div>
    </div>
  );
};

export default PublicScreenRightbar;
