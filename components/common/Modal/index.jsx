// libraries
import Fade from "react-reveal/Fade";
import moment from "moment";

// styles
import styles from "../../../styles/PublicScreen.module.sass";

// components
import Loading from "../../common/Loading";

const Modal = ({ setModal, onDelete, loading, data }) => {
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
            {moment(data.starting_date).format("dddd, MMMM DD, YYYY")}
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
