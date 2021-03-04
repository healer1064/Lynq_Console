// styles
import styles from "../../styles/PublicScreen.module.sass";

const PublicScreenModal = ({ setModal }) => {
  return (
    <div className={styles.public_screen_modal}>
      <div>
        <img
          onClick={() => setModal(false)}
          src="/img/public-screen-close.svg"
          alt="close"
        />
        <h6>Cancel The Appointment</h6>
        <p>
          Are you sure you want to delete the appointment with John Regis,
          <br />
          Monday February 22 at 12:00PM
        </p>
        <button onClick={() => setModal(false)}>CONFIRM</button>
      </div>
    </div>
  );
};

export default PublicScreenModal;
