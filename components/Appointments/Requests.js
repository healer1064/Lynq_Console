import React, { useState } from "react";
import Fade from "react-reveal/Fade";

import RequestModal from "./RequestModal";

const Requests = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fade duration={1200}>
      <div className="content-wrp">
        <div className="appointment-request">
          {isOpen && <RequestModal setModalShow={setIsOpen} />}
          <a href="#" className="appointment-request__back">
            Back
          </a>
          <h2>Appointment Request</h2>
          <span className="received__time">Received 12 hours, 31 min ago</span>
          <div className="info__col">
            <strong>Event type</strong>
            <p>Full Moon Meditation</p>
          </div>
          <div className="info__col">
            <strong>Duration</strong>
            <p>60 min</p>
          </div>
          <div className="info__col">
            <strong>Price</strong>
            <p>$50</p>
          </div>
          <div className="info__col">
            <strong>Day</strong>
            <p>Wednesday, February 22, 2021</p>
            <span className="see__day" onClick={() => setIsOpen(true)}>
              See you how your day look like
            </span>
          </div>
          <div className="info__col">
            <strong>Time</strong>
            <p>09:00 AM</p>
          </div>
          <div className="info__col">
            <strong>Appointment made by</strong>
            <p>Bob.iger@disney.com</p>
          </div>
          <div className="appointment-request__btns">
            <button className="reject">REJECT</button>
            <button className="accept">ACCEPT</button>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Requests;
