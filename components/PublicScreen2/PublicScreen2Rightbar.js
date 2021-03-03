// styles
import styles from "../../styles/PublicScreen.module.sass";

// components
import PublicScreenMore from "../PublicScreen/PublicScreenMore";
import PublicScreen2Calendar from "./PublicScreen2Calendar";

const PublicScreen2Rightbar = () => {
  return (
    <div className={styles.public_screen2_right}>
      <div className={styles.book_session}>
        <h3>Book a session</h3>
        <select>
          <option>Meditation 60 min</option>
          <option>Select the type of session</option>
        </select>
        <div className={styles.info}>
          <h6>
            Length: <span>1 hr</span>
          </h6>
          <h6>Price: $50</h6>
        </div>
        <PublicScreen2Calendar />
        <button>Book</button>
      </div>
      <div className={styles.needs}>
        <h3>What you need to bring</h3>
        <div>
          <p>Yoga mattress</p>
          <p>Dumbbells</p>
          <p>Whatelse?</p>
        </div>
      </div>
      <div className={styles.learn}>
        <h3>What will you learn?</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum
          fringilla adipiscing sed posuere sed null viverra nulla elit.{" "}
        </p>
        <PublicScreenMore />
      </div>
    </div>
  );
};

export default PublicScreen2Rightbar;
