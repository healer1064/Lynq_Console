import React, { useState } from "react";
import Fade from "react-reveal/Fade";

import RequestModal from "./RequestModal";

const RequestDetail = ({ data, toggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fade>
      <div className="content-wrp">
        <div className="appointment-request">
          {isOpen && <RequestModal setModalShow={setIsOpen} />}
          <a
            className="appointment-request__back"
            style={{ cursor: "pointer" }}
            onClick={() => toggle(false)}
          >
            Back
          </a>
          <h2>Appointment Request</h2>
          <span className="received__time">Received {data.ago}</span>
          <div className="info__col">
            <strong>Event type</strong>
            <p>{data.event_type}</p>
          </div>
          <div className="info__col">
            <strong>Duration</strong>
            <p>{data.duration}</p>
          </div>
          <div className="info__col">
            <strong>Price</strong>
            <p>${data.price}</p>
          </div>
          <div className="info__col">
            <strong>Day</strong>
            <p>{data.day}</p>
            <span className="see__day" onClick={() => setIsOpen(true)}>
              See you how your day look like
            </span>
          </div>
          <div className="info__col">
            <strong>Time</strong>
            <p>{data.time}</p>
          </div>
          <div className="info__col">
            <strong>Appointment made by</strong>
            <p>{data.made_by}</p>
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

export default RequestDetail;
