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
              className={styles.request__item}
              onClick={() => toggle(true, item)}
            >
              {item.event_type}
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
