import React from "react";
import Fade from "react-reveal/Fade";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { CaretRightOutlined } from "@ant-design/icons";

// style
import styles from "./styles.module.css";

const InvitationsList = ({ invitationsList }) => {
  // router
  const router = useRouter();

  const getFromTime = (date) => {
    let now = moment();
    let start = moment(date);

    return start.from(now);
  };

  return invitationsList.length === 0 ? (
    <div className="no-appointments">
      <p>No invitations to show</p>
    </div>
  ) : (
    <div className={styles.request__list}>
      <div className={styles.requests_head}>
        <p>Sent</p>
        <p>Event Name</p>
        <p>Email</p>
        <p>First Name</p>
        <p>Last Name</p>
      </div>
      {invitationsList.map((item, i) => (
        <Fade key={i} duration={800} delay={50}>
          <div
            key={item}
            // onClick={() => router.push(`/appointments/requests/${item.id}`)}
            onClick={() => router.push(`/appointments/${item.id}`)}
            className={styles.request_single_item}
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
            <p>{item.email}</p>
            <p>{item.first_name}</p>
            <p>{item.last_name}</p>

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

export default InvitationsList;
