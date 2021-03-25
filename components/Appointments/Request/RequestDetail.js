import React, { useState } from "react";
import Fade from "react-reveal/Fade";

// components
import RequestDrawer from "./RequestDrawer";
import PageLoading from "../../common/PageLoading";

// utils
import { fullDate, getTime, getDuration } from "../../../utils/dates";

const RequestDetail = ({
  data,
  toggle,
  apt,
  requestAccept,
  requestReject,
  loading,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return loading ? (
    <PageLoading />
  ) : (
    <Fade>
      <div style={{ marginTop: "-30px" }} className="content-wrp">
        {loading && (
          <img
            src="/img/loading.gif"
            style={{ position: "fixed", top: "50%", left: "50%" }}
            width={50}
          />
        )}
        <div className="appointment-request">
          {/* {isOpen && <RequestModal setModalShow={setIsOpen} />} */}
          {isOpen && (
            <RequestDrawer
              isOpen={isOpen}
              toggle={toggleDrawer}
              apt={apt}
              day={fullDate(data.starting_date)}
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
          <span className="received__time">Received {data.ago}</span>
          <div className="info__col">
            <strong>Event type</strong>
            <p>No field from backend</p>
          </div>
          <div className="info__col">
            <strong>Duration</strong>
            <p>{getDuration(data.starting_date, data.ending_date)}</p>
          </div>
          <div className="info__col">
            <strong>Price</strong>
            <p>${data.display_price || "0"}</p>
          </div>
          <div className="info__col">
            <strong>Day</strong>
            <p>{fullDate(data.starting_date)}</p>
            <span className="see__day" onClick={() => setIsOpen(true)}>
              See you how your day look like
            </span>
          </div>

          <div className="info__col">
            <strong>Time</strong>
            <p>{getTime(data.starting_date)}</p>
          </div>
          <div className="info__col">
            <strong>Appointment made by</strong>
            <p>{`${data.first_name} ${data.last_name}`}</p>
          </div>
          <div className="appointment-request__btns">
            <button className="reject" onClick={() => requestReject(data.id)}>
              REJECT
            </button>
            <button className="accept" onClick={() => requestAccept(data.id)}>
              ACCEPT
            </button>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default RequestDetail;
