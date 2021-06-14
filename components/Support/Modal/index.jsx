// libraries
import React from "react";

// styles
import styles from "./styles.module.sass";

const NewAppointmentModal = ({ setModal }) => {
  return (
    <div className={styles.modal}>
      <div>
        <img
          src="/img/new-appointment-close-modal.png"
          alt="close-modal"
          className={styles.close}
          onClick={() => setModal(false)}
        />
        <img src="/img/new-appointment-success.png" alt="success" />
        <p>Your message was sent to Lynq's team</p>
      </div>
    </div>
  );
};

export default NewAppointmentModal;
