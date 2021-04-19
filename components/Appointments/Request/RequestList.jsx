import React from "react";
import Fade from "react-reveal/Fade";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

// style
import styles from "./Request.module.css";

const RequestList = ({ requestList }) => {
  // router
  const router = useRouter();

  const getFromTime = (date) => {
    let now = moment();
    let start = moment(date);

    return start.from(now);
  };

  return requestList.length === 0 ? (
    <div className="no-appointments">
      <p>No requests to show</p>
    </div>
  ) : (
    <div className={styles.request__list}>
      {requestList.map((item, i) => (
        <Fade key={i} duration={800} delay={50}>
          <div
            key={item}
            onClick={() => router.push(`/appointments/requests/${item.id}`)}
            className={`appointments-col__card__wrp`}
          >
            <div className="appointments-col__card">
              <div className="det">
                <b>{moment(item.starting_date).format("ddd, MMMM DD, YYYY")}</b>
                <div className="line"></div>
                {item.activity_name}
                <div className="line"></div>
                {item.email}
                <div className="line"></div>
                {"Invitation Sent: " + getFromTime(item.create_date)}
              </div>
              <div
                className="arrow"
                style={{ transform: "rotate(270deg)", marginLeft: "10px" }}
              >
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 12L0.0717964 0L13.9282 0L7 12Z" fill="#7E88F4" />
                </svg>
              </div>
            </div>
          </div>
        </Fade>
      ))}
    </div>
  );
};

export default RequestList;
