import React, { useState, useContext } from "react";
import Fade from "react-reveal/Fade";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// style
import styles from "./Request.module.css";
import RequestDetail from "./RequestDetail";

// context
import ProfileContext from "../../../context/profile";

const RequestList = ({
  requestList,
  apt,
  setTabIndex,
  success,
  setSuccess,
}) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [showDetail, setShowDetail] = useState(false);
  const [requestData, setRequsetData] = useState(null);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);

  console.log(requestList);

  const onAccept = (id) => {
    setAcceptLoading(true);

    async function accept() {
      const response = await fetch(
        `https://api.lynq.app/account/appointments/${id}/accept?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return await response;
    }

    accept().then((res) => {
      console.log("res accept", res);
      setAcceptLoading(false);
      if (res.status === 200) {
        setSuccess(!success);
        setTabIndex(1);
      } else {
        toast.error("An error has occurred");
        console.log(res);
      }
    });
  };
  const onReject = (id) => {
    setRejectLoading(true);

    async function reject() {
      const response = await fetch(
        `https://api.lynq.app/account/appointments/${id}/cancel?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return await response;
    }

    reject().then((res) => {
      console.log("res reject", res);
      setRejectLoading(false);
      if (res.status === 200) {
        setSuccess(!success);
        setTabIndex(1);
      } else {
        // toast.error(res.message);
        console.log(res.message);
      }
    });
  };

  const toggle = (_flag, _data) => {
    setShowDetail(_flag);
    setRequsetData(_data);
  };

  return requestList.length === 0 ? (
    <div className="no-appointments">
      <p>No requests to show</p>
    </div>
  ) : (
    <div className={styles.request__list}>
      {!showDetail ? (
        requestList.map((item, i) => (
          <Fade key={i} duration={800} delay={50}>
            <div
              key={item}
              onClick={() => toggle(true, item)}
              className={`appointments-col__card__wrp`}
            >
              <div className="appointments-col__card">
                <div className="det">
                  <b>
                    {moment(item.starting_date).format("ddd, MMMM DD, YYYY")}
                  </b>
                  <div className="line"></div>
                  {item.activity_name}
                  <div className="line"></div>
                  {item.email}
                  <div className="line"></div>
                  {"Invitation Sent: "}
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
                    <path
                      d="M7 12L0.0717964 0L13.9282 0L7 12Z"
                      fill="#7E88F4"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Fade>
        ))
      ) : (
        <>
          <RequestDetail
            data={requestData}
            toggle={toggle}
            apt={apt}
            requestAccept={onAccept}
            requestReject={onReject}
            rejectLoading={rejectLoading}
            acceptLoading={acceptLoading}
            ToastContainer={ToastContainer}
          />
        </>
      )}
    </div>
  );
};

export default RequestList;
