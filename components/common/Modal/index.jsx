// libraries
import Fade from "react-reveal/Fade";

// styles
import styles from "../../../styles/PublicScreen.module.sass";

// components
import Loading from "../../common/Loading";

const Modal = ({ setModal, onDelete, loading }) => {
  return (
    <Fade duration={600}>
      <div className={styles.public_screen_modal}>
        <div>
          <img
            onClick={() => setModal(false)}
            src="/img/public-screen-close.svg"
            alt="close"
          />
          <h6>Cancel The Appointment</h6>
          <p>
            Are you sure you want to cancel the appointment?,
            <br />
            Monday February 22 at 12:00PM
          </p>
          <button
            style={{ position: "relative" }}
            onClick={() => onDelete(false)}
          >
            {loading && <Loading color="#EF7888" />}Yes, I confirm the
            cancellation
          </button>
        </div>
      </div>
    </Fade>
  );
};

export default Modal;
