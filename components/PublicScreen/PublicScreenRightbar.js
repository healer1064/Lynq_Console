import styles from "../../styles/PublicScreen.module.sass";

const PublicScreenRightbar = () => {
  return (
    <div className={styles.public_screen_right}>
      <div className={styles.book_session}>
        <h3>Book a session</h3>
        <select>
          <option>Select the type of session</option>
          <option>Select the type of session</option>
        </select>
      </div>
    </div>
  );
};

export default PublicScreenRightbar;
