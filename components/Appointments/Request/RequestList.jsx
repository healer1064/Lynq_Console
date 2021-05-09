import { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { CaretRightOutlined } from "@ant-design/icons";

// style
import styles from "./Request.module.css";

const RequestList = ({ requestList, filter }) => {
  // states
  const [requests, setRequests] = useState(requestList);

  // router
  const router = useRouter();

  const getFromTime = (date) => {
    let now = moment();
    let start = moment(date);

    return start.from(now);
  };

  useEffect(() => {
    if (filter.toLowerCase() === "active") {
      setRequests(
        requestList.filter((req) => new Date(req.ending_date) > new Date())
      );
    } else if (filter.toLowerCase() === "past") {
      setRequests(
        requestList.filter((req) => new Date(req.ending_date) < new Date())
      );
    }
  }, [filter, requestList]);

  return requests.length === 0 ? (
    <div className="no-appointments">
      <br />
      <p style={{ alignSelf: "flex-start", marginTop: "50px" }}>
        No requests to show
      </p>
    </div>
  ) : (
    <div className={styles.request__list}>
      <div className={styles.requests_head}>
        <p>Received</p>
        <p>Event Name</p>
        <p>Type</p>
        <p>Email</p>
        <p>Answer</p>
      </div>
      {requests.map((item, i) => (
        <Fade key={i} duration={800} delay={50}>
          <div
            key={item}
            onClick={() => router.push(`/appointments/requests/${item.id}`)}
            className={styles.request_single_item}
            // style={{
            //   backgroundColor:
            //     new Date(item.starting_date) < new Date()
            //       ? "#e0e0e0"
            //       : "#f9f9f9",
            // }}
          >
            <p>
              {moment(item.create_date).format("ddd MM, YYYY")}
              <span
                style={{
                  borderLeft: "1px solid #aaa",
                  margin: "0 5px",
                }}
              ></span>
              {getFromTime(item.create_date)}
            </p>
            <p>{item.activity_name}</p>
            <p style={{ color: "#7e88f4" }}>Live</p>
            <p>{item.email}</p>
            <p>
              {new Date(item.starting_date) < new Date() ? "Expired" : "N/A"}
            </p>
            <CaretRightOutlined
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#7e88f4",
              }}
            />
          </div>
        </Fade>
      ))}
    </div>
  );
};

export default RequestList;
