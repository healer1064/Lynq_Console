// styles
import styles from "../../styles/PublicScreen.module.sass";

const PublicScreen2Calendar = () => {
  return (
    <div className={styles.booking_calendar}>
      <div className={styles.calendar_head}>
        <div>
          <img src="/img/public-screen-left.svg" alt="left" />
        </div>
        <div>
          <img src="/img/public-screen-right.svg" alt="right" />
        </div>
      </div>
      <div className={styles.calendar_body}>
        <div className={styles.table_head}>
          <div>
            <h6>Mon</h6>
            <p>29 Mar</p>
          </div>
          <div>
            <h6>Tue</h6>
            <p>30 Mar</p>
          </div>
          <div>
            <h6>Wed</h6>
            <p>31 Mar</p>
          </div>
          <div>
            <h6>Thu</h6>
            <p>1 Apr</p>
          </div>
        </div>
        <div className={styles.table_body}>
          <div>
            <div>
              <p>9:00 AM</p>
            </div>
            <div>
              <p>9:00 AM</p>
            </div>
            <div>
              <p>9:00 AM</p>
            </div>
            <div>
              <p>9:00 AM</p>
            </div>
            <div>
              <p>9:00 AM</p>
            </div>
          </div>
          <div>
            <div>
              <p>9:00 AM</p>
            </div>
            <div className={styles.active}>
              <p>9:00 AM</p>
            </div>
            <div>
              <p>9:00 AM</p>
            </div>
            <div>
              <p>9:00 AM</p>
            </div>
          </div>
          <div>
            <div>
              <p>9:00 AM</p>
            </div>
            <div>
              <p>9:00 AM</p>
            </div>
            <div>
              <p>9:00 AM</p>
            </div>
            <div>
              <p>9:00 AM</p>
            </div>
          </div>
          <div>
            <div>
              <p>9:00 AM</p>
            </div>
            <div>
              <p>9:00 AM</p>
            </div>
            <div>
              <p>9:00 AM</p>
            </div>
            <div>
              <p>9:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicScreen2Calendar;
