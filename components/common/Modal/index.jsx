// libraries
import Fade from "react-reveal/Fade";
import moment from "moment";

// styles
import styles from "./styles.module.sass";

// components
import Loading from "@/components/common/Loading";

const Modal = ({ setModal, onDelete, loading, title, buttonText }) => {
  return (
    <Fade duration={600}>
      <div
        className={styles.public_screen_modal}
        onClick={() => setModal(false)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <img
            onClick={() => setModal(false)}
            src="/img/public-screen-close.svg"
            alt="close"
          />
          <h6>{title || "Delete masterclass"}</h6>
          <p style={{ margin: "0 0 5px 0" }}>
            Are you sure you want to delete the masterclass?
          </p>
          <p style={{ margin: "0 0 20px 0" }}>
            {`${moment().format("dddd, MMMM DD, YYYY")}
            `}
          </p>
          <button style={{ position: "relative" }} onClick={onDelete}>
            {loading && <Loading color="#EF7888" />}
            {buttonText || "Delete"}
          </button>
        </div>
      </div>
    </Fade>
  );
};

export default Modal;
