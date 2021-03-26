import React from "react";
import Fade from "react-reveal/Fade";

// utils
import { fullDate, getTime, getDuration, timeAgo } from "../../../utils/dates";

// components
import Loading from "../../common/Loading";

const InvitationDetail = ({
  data,
  toggle,
  handleDelete,
  handleEdit,
  editLoading,
  deleteLoading,
}) => {
  return (
    <Fade>
      <div style={{ marginTop: "-30px" }} className="content-wrp">
        <div className="appointment-request">
          <a
            className="appointment-request__back"
            style={{ cursor: "pointer" }}
            onClick={() => toggle(false)}
          >
            Back
          </a>
          <h2>Appointment Invitation</h2>
          <span className="received__time">
            Received {timeAgo(data.starting_date)}
          </span>
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
          </div>

          <div className="info__col">
            <strong>Time</strong>
            <p>{getTime(data.starting_date)}</p>
          </div>
          <div className="info__col">
            <strong>Invitation Sent</strong>
            <p>{timeAgo(data.starting_date)}</p>
          </div>
          <div className="info__col">
            <strong>Link to invitation</strong>
            <p>lynq.app/xyzxyz</p>
          </div>
          <div className="info__col">
            <strong>Client's Name</strong>
            <p>{`${data.first_name} ${data.last_name}`}</p>
          </div>
          <div className="info__col">
            <strong>Client's Email</strong>
            <p>{data.email}</p>
          </div>
          <div className="appointment-request__btns">
            <button onClick={() => handleDelete()} className="reject">
              {deleteLoading && <Loading color="#fff" />}
              DELETE
            </button>
            <button onClick={() => handleEdit()} className="accept">
              {editLoading && <Loading />}
              EDIT
            </button>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default InvitationDetail;
