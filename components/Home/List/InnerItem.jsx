// libraries
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment-timezone";
import { Modal } from "antd";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// helpers
import { dateIsBetween } from "@/utils/helpers/dates";

const InnerItem = ({ data }) => {
  // context
  const { slugData } = useContext(ProfileContext);

  // states
  const [status, setStatus] = useState(true);
  const [descModal, setDescModal] = useState(false);

  useEffect(() => {
    let checkStatus =
      dateIsBetween(data.starting_date, data.ending_date) ||
      new Date(data.ending_date) > new Date();
    setStatus(checkStatus);
  }, []);

  return (
    <div
      className={`${styles.inner_item} ${
        !status ? styles.gray : data.activity_name ? styles.blue : styles.yellow
      }`}
    >
      <div className={styles.title}>
        {data.activity_name
          ? `${data.session_duration} mins session`
          : data.summary}
      </div>
      <div className={styles.det}>
        {moment(data.starting_date).format("dddd, MMMM DD, YYYY")}
        <div className={styles.line}></div>
        <b>
          {moment(data.starting_date).format("hh:mm a")} -{" "}
          {moment(data.ending_date).format("hh:mm a")}
        </b>
        <div className={styles.line}></div>
        <b>
          {data.activity_name
            ? data.session_duration
            : moment(data.ending_date).diff(
                moment(data.starting_date),
                "minutes",
              )}{" "}
          mins
        </b>
      </div>
      {data.activity_name && (
        <div className={styles.client}>
          Client: {data.first_name + " " + data.last_name}
          <div className={styles.line}></div>
          {data.email}
        </div>
      )}
      {status && data.note_to_teacher && (
        <button
          className={styles.clients_question}
          onClick={() => setDescModal(true)}
        >
          See client's question
        </button>
      )}
      {!data.activity_name && (
        <>
          <br />
          <span>Booking from Google Calendar</span>
        </>
      )}
      {!status && <span className={styles.past_event}>Past Event</span>}
      {status && (
        <>
          {data.activity_name && (
            <div style={{ marginTop: "1rem" }}>
              <Link href={`/calls/requests/${data.id}`}>
                <a className={styles.btn_cancel}>Manage Session</a>
              </Link>
              <Link
                href={`https://lynq.app/${slugData?.slug}/one-to-one/${data.id}`}
              >
                <a target='_blank' className={styles.btn_goto}>
                  Start the video
                </a>
              </Link>
              {data?.status?.toLowerCase().includes("awaiting-payment") && (
                <span className={styles.payment_not_paid}>
                  This session has not been paid by your client.{" "}
                  <Link href={`/appointments/${data.id}`}>
                    See details here
                  </Link>
                </span>
              )}
            </div>
          )}
        </>
      )}
      <Modal
        title={`${data.first_name} ${data.last_name}'s question`}
        visible={descModal}
        onOk={() => setDescModal(false)}
        onCancel={() => setDescModal(false)}
      >
        <p>{data.note_to_teacher}</p>
      </Modal>
    </div>
  );
};

export default InnerItem;
