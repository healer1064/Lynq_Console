// libraries
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import moment from "moment-timezone";
import { Modal } from "antd";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import { postRejectReq } from "@/utils/requests/calls/requests";
import { deleteMasterclass } from "@/utils/requests/masterclass";

// helpers
import { dateIsBetween } from "@/utils/helpers/dates";

const InnerItem = ({ data, refetchResponse }) => {
  // context
  const { slugData, token } = useContext(ProfileContext);

  // router
  const router = useRouter();

  // states
  const [status, setStatus] = useState(true);
  const [descModal, setDescModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let checkStatus =
      dateIsBetween(
        data.starting_date ? data.starting_date : data.date,
        data.ending_date
          ? data.ending_date
          : moment(data.date).add(data.duration, "minutes"),
      ) ||
      new Date(
        data.ending_date
          ? data.ending_date
          : moment(data.date).add(data.duration, "minutes"),
      ) > new Date();
    setStatus(checkStatus);
  }, []);

  const showDeleteModal = () => {
    setDeleteModal(true);
  };

  // handle delete
  const handleDelete = () => {
    setLoading(true);
    if (data.activity_name) {
      postRejectReq(token, data.id)
        .then((res) => {
          setLoading(false);
          if (res.status == 200) {
            setDeleteModal(false);
            refetchResponse();
          } else {
            toast.error("Failed to delete the call request.");
          }
        })
        .catch(() => {
          setLoading(false);
          toast.error("Failed to delete the call request.");
        });
    } else {
      deleteMasterclass(token, data.id)
        .then((res) => {
          setLoading(false);
          if (res.status == 200) {
            setDeleteModal(false);
            refetchResponse();
          } else {
            toast.error("Failed to delete the masterclass.");
          }
        })
        .catch(() => {
          setLoading(false);
          toast.error("Failed to delete the masterclass.");
        });
    }
  };

  // handle cancel
  const handleCancel = () => {
    setDeleteModal(false);
  };

  return (
    <div
      className={`${styles.inner_item} ${
        !status
          ? styles.gray
          : data.activity_name ||
            data.name ||
            data.summary == "not_google_calendar"
          ? styles.blue
          : styles.yellow
      }`}
    >
      <div className={styles.title}>
        {data.activity_name
          ? `${data.session_duration} mins session`
          : data.name
          ? data.name
          : data.summary == "not_google_calendar"
          ? `${data.session_duration} mins session`
          : data.summary}
      </div>
      <div className={styles.det}>
        {moment(data.starting_date || data.date).format("dddd, MMMM DD, YYYY")}
        <div className={styles.line}></div>
        <b>
          {moment(data.starting_date || data.date).format("hh:mm a")} -{" "}
          {moment(
            data.ending_date || moment(data.date).add(data.duration, "minutes"),
          ).format("hh:mm a")}
        </b>
        <div className={styles.line}></div>
        <b>
          {data.activity_name
            ? data.session_duration
            : data.duration
            ? data.duration
            : moment(data.ending_date).diff(
                moment(data.starting_date),
                "minutes",
              )}{" "}
          mins
        </b>
      </div>
      {data.summary == "not_google_calendar" && (
        <div className={styles.client}>
          Client: {data.first_name + " " + data.last_name}
          <div className={styles.line}></div>
          {data.email}
        </div>
      )}
      {status && (data.note_to_teacher || data.name) && (
        <button
          className={styles.clients_question}
          onClick={() => {
            data.note_to_teacher
              ? setDescModal(true)
              : router.push(`/masterclass/${data.id}`);
          }}
        >
          {data.note_to_teacher ? "See client's question" : "See details"}
        </button>
      )}
      {data.summary == "not_google_calendar" ||
        (!data.name && (
          <>
            <br />
            <span>Booking from Google Calendar</span>
          </>
        ))}
      {!status && <span className={styles.past_event}>Past Event</span>}
      {status && (
        <>
          {(data.summary == "not_google_calendar" || data.name) && (
            <div style={{ marginTop: "1rem" }}>
              <a onClick={showDeleteModal} className={styles.btn_cancel}>
                Delete the session
              </a>
              <Link
                href={
                  data.starting_date
                    ? `https://lynq.app/${slugData?.slug}/ex/one-to-one/${data.id}`
                    : `https://lynq.app/${slugData?.slug}/ex/masterclass/${data.id}?role=expert`
                }
              >
                <a target='_blank' className={styles.btn_goto}>
                  Start the {data.activity_name ? "call" : "masterclass"}
                </a>
              </Link>
              {/* {data?.status?.toLowerCase().includes("awaiting-payment") && (
                <span className={styles.payment_not_paid}>
                  This session has not been paid by your client.{" "}
                  <Link href={`/appointments/${data.id}`}>
                    See details here
                  </Link>
                </span>
              )} */}
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
      <Modal
        title='Are you sure?'
        visible={deleteModal}
        onOk={handleDelete}
        confirmLoading={loading}
        onCancel={handleCancel}
        okText='Delete'
      >
        <p>You won't be able to revert this!</p>
      </Modal>
    </div>
  );
};

export default InnerItem;
