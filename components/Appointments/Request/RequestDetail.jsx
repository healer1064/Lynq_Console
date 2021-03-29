import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import moment from "moment";

// components
import Loading from "../../common/Loading";
import RequestDrawer from "./RequestDrawer";

const RequestDetail = ({
  data,
  toggle,
  apt,
  requestAccept,
  requestReject,
  rejectLoading,
  acceptLoading,
  ToastContainer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <Fade>
      <div style={{ marginTop: "-30px" }} className="content-wrp">
        <div className="appointment-request">
          {isOpen && (
            <RequestDrawer
              isOpen={isOpen}
              toggle={toggleDrawer}
              apt={apt}
              day={moment(data.starting_date).format("ddd, MMM DD, YYYY")}
              thatDate={data.starting_date}
            />
          )}
          <a
            className="appointment-request__back"
            style={{ cursor: "pointer" }}
            onClick={() => toggle(false)}
          >
            Back
          </a>
          <h2>Appointment Request</h2>
          <span className="received__time">
            Received: 'no created at field in backend'
          </span>
          <ToastContainer />
          <div className="info__col">
            <strong>Event type</strong>
            <p>No field from backend</p>
          </div>
          <div className="info__col">
            <strong>Duration</strong>
            <p>No duration field from backend</p>
          </div>
          <div className="info__col">
            <strong>Price</strong>
            <p>${data.display_price || "0"}</p>
          </div>
          <div className="info__col">
            <strong>Day</strong>
            <p>{moment(data.starting_date).format("dddd, MMMM DD, YYYY")}</p>
            <span className="see__day" onClick={() => setIsOpen(true)}>
              See you how your day look like
            </span>
          </div>

          <div className="info__col">
            <strong>Time</strong>
            <p>{moment(data.starting_date).format("hh:mm a")}</p>
          </div>
          <div className="info__col">
            <strong>Appointment made by</strong>
            <p>{`${data.first_name} ${data.last_name}`}</p>
          </div>
          <div className="appointment-request__btns">
            <button className="reject" onClick={() => requestReject(data.id)}>
              {rejectLoading && <Loading color="#fff" />}REJECT
            </button>
            <button className="accept" onClick={() => requestAccept(data.id)}>
              {acceptLoading && <Loading />}ACCEPT
            </button>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default RequestDetail;
