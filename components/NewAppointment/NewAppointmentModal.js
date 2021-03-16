import React from "react";

const NewAppointmentModal = ({ setModal }) => {
  return (
    <div className="new-appointment-modal">
      <div>
        <img
          src="/img/new-appointment-close-modal.png"
          alt="close-modal"
          className="new-appointment-modal-close"
          onClick={() => setModal(false)}
        />
        <img src="/img/new-appointment-success.png" alt="success" />
        <p>Your message was sent to Lynq's team</p>
      </div>
    </div>
  );
};

export default NewAppointmentModal;
