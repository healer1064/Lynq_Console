// libraries
import Fade from "react-reveal/Fade";
import moment from "moment";

// styles
import styles from "../../../styles/PublicScreen.module.sass";

// components
import Loading from "../../common/Loading";

const Modal = ({
  setModal,
  onDelete,
  loading,
  data,
  title,
  subtitle,
  buttonText,
}) => {
  return (
    <Fade duration={600}>
      <div className={styles.public_screen_modal}>
        <div>
          <img
            onClick={() => setModal(false)}
            src="/img/public-screen-close.svg"
            alt="close"
          />
          <h6>{title || "Cancel The Appointment"}</h6>
          <p style={{ margin: "0 0 5px 0" }}>
            Are you sure you want to cancel the appointment?
          </p>
          <p style={{ margin: "0 0 20px 0" }}>
            {`${
              data && moment(data.starting_date).format("dddd, MMMM DD, YYYY")
            }
            `}
          </p>
          <button
            style={{ position: "relative" }}
            onClick={() => onDelete && onDelete(false)}
          >
            {loading && <Loading color="#EF7888" />}
            {buttonText || "Yes, I confirm the cancellation"}
          </button>
        </div>
      </div>
    </Fade>
  );
};

export default Modal;
