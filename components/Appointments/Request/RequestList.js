import React, { useState } from "react";
import Fade from "react-reveal/Fade";

// style
import styles from "./Request.module.css";
import RequestDetail from "./RequestDetail";

const RequestList = ({ requestList }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [requestData, setRequsetData] = useState(null);

  const toggle = (_flag, _data) => {
    setShowDetail(_flag);
    setRequsetData(_data);
  };

  return (
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
                  <b>Monday, March 22, 2021</b>
                  <div className="line"></div>
                  Full moon meditation
                  <div className="line"></div>
                  john.ringer@gmail.com
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
        <RequestDetail data={requestData} toggle={toggle} />
      )}
    </div>
  );
};

export default RequestList;
