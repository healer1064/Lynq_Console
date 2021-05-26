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

// components
import Countdown from "./Async/Countdown";

const RequestList = ({ requestList, filter, asyncList }) => {
  // states
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
    if (filter.toLowerCase() === "all active") {
      setList(requestList.concat(asyncList));
    } else if (filter.toLowerCase() === "live sessions") {
      setList(requestList);
    } else if (filter.toLowerCase() === "asynchronous") {
      setList(asyncList);
    } else if (filter.toLowerCase() === "expired") {
      setList(
        requestList.filter((req) => new Date(req.ending_date) < new Date())
      );
    }
  }, [filter]);

  const onOrderChange = () => {
    setOrder(!order);
  };

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
        <p>Status</p>
      </div>
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
            >
              <p>
                {item.requestDate
                  ? moment(item.requestDate).format("ddd MM/DD/YYYY")
                  : moment(item.create_date).format("ddd MM/DD/YYYY")}
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
                {item.requestDate ? (
                  item.maxDeliveryTime ? (
                    <Countdown date={item.maxDeliveryTime} />
                  ) : (
                    "N/A"
                  )
                ) : new Date(item.starting_date) < new Date() ? (
                  "Expired"
                ) : (
                  "To Validate"
                )}
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
