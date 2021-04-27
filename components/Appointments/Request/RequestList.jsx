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
      <div className={styles.requests_head}>
        <p>Name</p>
        <p>Type</p>
        <p>Received</p>
      </div>
      {requestList.map((item, i) => (
        <Fade key={i} duration={800} delay={50}>
          <div
            key={item}
            onClick={() => router.push(`/appointments/requests/${item.id}`)}
            className={styles.request_single_item}
          >
            <p>{item.activity_name}</p>
            <p>Scheduled Video Call</p>
            <p>
              {moment(item.create_date).format("ddd MM, YYYY")}
              <span
                style={{
                  borderLeft: "1px solid #aaa",
                  margin: "0 10px",
                }}
              ></span>
              {getFromTime(item.create_date)}
            </p>
          </div>
        </Fade>
      ))}
    </div>
  );
};

export default RequestList;
