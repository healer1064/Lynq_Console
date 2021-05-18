import { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import {
  CaretRightOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";

// style
import styles from "./Request.module.css";

const RequestList = ({ requestList, filter, asyncList }) => {
  // states
  // const [requests, setRequests] = useState(requestList);
  // const [asyncs, setAsyncs] = useState(asyncList);
  const [list, setList] = useState(requestList.concat(asyncList));
  const [order, setOrder] = useState(false);

  // router
  const router = useRouter();

  const getFromTime = (date) => {
    let now = moment();
    let start = moment(date);

    return start.from(now);
  };

  useEffect(() => {
    if (filter.toLowerCase() === "active") {
      // setRequests(
      //   requestList.filter((req) => new Date(req.ending_date) > new Date())
      // );
      // setAsyncs(asyncList);
      setList(requestList.concat(asyncList));
    } else if (filter.toLowerCase() === "scheduled") {
      // setAsyncs([]);
      // setRequests(requestList);
      setList(requestList);
    } else if (filter.toLowerCase() === "asynchronous") {
      // setAsyncs(asyncList);
      // setRequests([]);
      setList(asyncList);
    } else if (filter.toLowerCase() === "past") {
      // setRequests(
      //   requestList.filter((req) => new Date(req.ending_date) < new Date())
      // );
      // setAsyncs(asyncList);
      setList(
        requestList.filter((req) => new Date(req.ending_date) < new Date())
      );
    }
  }, [filter]);

  const onOrderChange = () => {
    setOrder(!order);
  };

  // useEffect(() => {
  //   setList(
  //     list.sort(function (a, b) {
  //       var dateA = new Date(a.create_date || a.requestDate),
  //         dateB = new Date(b.create_date || b.requestDate);
  //       return dateB - dateA;
  //     })
  //   );
  // }, [list]);

  return list.length === 0 ? (
    <div className="no-appointments">
      <br />
      <p style={{ alignSelf: "flex-start", marginTop: "50px" }}>
        No requests to show
      </p>
    </div>
  ) : (
    <div className={styles.request__list}>
      <div className={styles.requests_head}>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={onOrderChange}
        >
          Received{" "}
          {order ? (
            <CaretUpOutlined style={{ marginLeft: "30px" }} />
          ) : (
            <CaretDownOutlined style={{ marginLeft: "30px" }} />
          )}
        </p>
        <p>Event Name</p>
        <p>Type</p>
        <p>Email</p>
        <p>Answer</p>
      </div>
      {/* {requests.map((item, i) => (
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
      ))} */}
      {/* {asyncs.map((item, i) => (
        <Fade key={i} duration={800} delay={50}>
          <div
            key={item}
            onClick={() =>
              router.push(`/appointments/requests/async/${item.id}`)
            }
            className={styles.request_single_item}
            // style={{
            //   backgroundColor:
            //     new Date(item.starting_date) < new Date()
            //       ? "#e0e0e0"
            //       : "#f9f9f9",
            // }}
          >
            <p>
              {moment(item.requestDate).format("ddd MM, YYYY")}
              <span
                style={{
                  borderLeft: "1px solid #aaa",
                  margin: "0 5px",
                }}
              ></span>
              {getFromTime(item.requestDate)}
            </p>
            <p>{item.activityName}</p>
            <p style={{ color: "#7e88f4" }}>Asynchronous</p>
            <p>{item.customerEmail}</p>
            <p>
              // {new Date(item.requestDate) < new Date() ? "Expired" : "N/A"}
              Yes
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
      ))} */}
      {list
        .sort(function (a, b) {
          var dateA = new Date(a.create_date || a.requestDate),
            dateB = new Date(b.create_date || b.requestDate);
          if (order) {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        })
        .map((item, i) => (
          <Fade key={i} duration={800} delay={50}>
            <div
              key={item}
              onClick={() =>
                item.requestDate
                  ? router.push(`/appointments/requests/async/${item.id}`)
                  : router.push(`/appointments/requests/${item.id}`)
              }
              className={styles.request_single_item}
              // style={{
              //   backgroundColor:
              //     new Date(item.starting_date) < new Date()
              //       ? "#e0e0e0"
              //       : "#f9f9f9",
              // }}
            >
              <p>
                {item.requestDate
                  ? moment(item.requestDate).format("ddd MM, YYYY")
                  : moment(item.create_date).format("ddd MM, YYYY")}
                <span
                  style={{
                    borderLeft: "1px solid #aaa",
                    margin: "0 5px",
                  }}
                ></span>
                {item.requestDate
                  ? getFromTime(item.requestDate)
                  : getFromTime(item.create_date)}
              </p>
              <p>
                {item.activityName ? item.activityName : item.activity_name}
              </p>
              <p style={{ color: "#7e88f4" }}>
                {item.activityName ? "Asynchronous" : "Live"}
              </p>
              <p>{item.customerEmail ? item.customerEmail : item.email}</p>
              <p>
                {/* {} */}
                {item.requestDate
                  ? "Yes"
                  : new Date(item.starting_date) < new Date()
                  ? "Expired"
                  : "N/A"}
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
