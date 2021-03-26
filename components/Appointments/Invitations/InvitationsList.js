import React, { useState } from "react";
import Fade from "react-reveal/Fade";

// style
import styles from "./Invitations.module.css";
import InvitationDetail from "./InvitationDetail";

// utils
import { fullDate, timeAgo } from "../../../utils/dates";

const InvitationsList = ({ invitations }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [invitationData, setInvitationData] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const toggle = (_flag, _data) => {
    setShowDetail(_flag);
    setInvitationData(_data);
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    setTimeout(() => {
      setDeleteLoading(false);
    }, 2000);
  };
  const handleEdit = () => {
    setEditLoading(true);
    setTimeout(() => {
      setEditLoading(false);
    }, 2000);
  };

  return invitations.length === 0 ? (
    <div className="no-appointments">
      <p>No requests to show</p>
    </div>
  ) : (
    <div className={styles.invitations__list}>
      {!showDetail ? (
        invitations.map((item, i) => (
          <Fade key={i} duration={800} delay={50}>
            <div
              key={item}
              onClick={() => toggle(true, item)}
              className={`appointments-col__card__wrp`}
            >
              <div className="appointments-col__card">
                <div className="det">
                  <b>{fullDate(item.starting_date)}</b>
                  <div className="line"></div>
                  Event Name (not from backend)
                  <div className="line"></div>
                  {item.email}
                  <div className="line"></div>
                  {"Invitation Sent: " + timeAgo(item.starting_date)}
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
        <InvitationDetail
          data={invitationData}
          toggle={toggle}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          editLoading={editLoading}
          deleteLoading={deleteLoading}
        />
      )}
    </div>
  );
};

export default InvitationsList;
