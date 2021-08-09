// libraries
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// icons
import { BsChevronLeft } from "react-icons/bs";

// requests
import {
  getMasterclass,
  deleteMasterclass,
} from "@/utils/requests/masterclass";

// components
import AppointmentsDrawer from "@/components/Calls/SingleRequest/Drawer";
import ParticipantsDrawer from "./Drawer";
import Modal from "@/components/common/Modal";
import PageLoading from "@/components/common/PageLoading";

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // router
  const router = useRouter();

  // params
  const { id } = router.query;

  // states
  const [data, setData] = useState(null);
  const [apptSwitch, setApptSwitch] = useState(false);
  const [participantsSwitch, setParticipantsSwitch] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // appointment drawer toggle
  const toggleApptsDrawer = () => {
    setApptSwitch(!apptSwitch);
  };

  // participants drawer toggle
  const toggleParticipantsDrawer = () => {
    setParticipantsSwitch(!participantsSwitch);
  };

  useEffect(() => {
    if (token && id) {
      getMasterclass(token)
        .then((res) => {
          if (res.error) {
            toast.error("Failed to get masterclass.");
          } else {
            setData(res.find((item) => id == item.id));
          }
        })
        .catch(() => toast.error("Failed to get masterclass."));
    }
  }, [token, id]);

  // handle delete
  const handleDelete = (_id) => {
    setDeleteLoading(true);
    deleteMasterclass(token, _id)
      .then((res) => {
        console.log(res);
        setDeleteLoading(false);
        if (res.status != 200) {
          toast.error("Failed to delete masterclass.");
        } else {
          router.push("/masterclass");
        }
      })
      .catch(() => {
        setDeleteLoading(false);
        toast.error("Failed to delete masterclass.");
      });
  };

  return data ? (
    <>
      <Fade>
        <div className={styles.request}>
          <a className={styles.back} onClick={() => router.back()}>
            <BsChevronLeft /> Back
          </a>
          <h2>Masterclass</h2>
          <span className={styles.received_time}>
            Created:{" "}
            {moment(data.createdAt).format("dddd, DD MMM, yyyy hh:mm a")}
          </span>
          <div className={styles.info_col}>
            <strong>Title</strong>
            <p>{data.name}</p>
          </div>
          <div className={styles.info_col}>
            <strong>Day</strong>
            <p>{moment(data.date).format("dddd, MMMM DD, YYYY")}</p>
            <span
              className={styles.see_day}
              onClick={() => setApptSwitch(true)}
            >
              See you how your day looks like
            </span>
          </div>
          <div className={styles.info_col}>
            <strong>Time</strong>
            <p>{moment(data.date).format("hh:mm a")}</p>
          </div>
          <div className={styles.info_col}>
            <strong>Length</strong>
            <p>{data.duration} mins</p>
          </div>
          <div className={styles.info_col}>
            <strong>Price</strong>
            <p>${data.price}</p>
          </div>
          <div className={styles.info_col}>
            <strong>Description</strong>
            <p>{data.description}</p>
          </div>
          <div className={styles.info_col}>
            <strong>Attendees</strong>
            <p
              onClick={toggleParticipantsDrawer}
              className={styles.participants}
            >
              {data.attendees.length}
            </p>
          </div>
          <div className={styles.info_col}>
            <strong>Revenue</strong>
            <p>${data.revenue}</p>
          </div>

          <div className={styles.btns}>
            <button
              onClick={() => router.push(`/masterclass/edit/${data.id}`)}
              className={styles.edit}
            >
              EDIT
            </button>
            <button
              onClick={() => setDeleteModal(true)}
              className={styles.delete}
            >
              DELETE
            </button>
          </div>
        </div>
      </Fade>
      {apptSwitch && (
        <AppointmentsDrawer
          isOpen={apptSwitch}
          toggle={toggleApptsDrawer}
          day={moment(data.date).format("ddd, MMM DD, YYYY")}
        />
      )}
      {participantsSwitch && (
        <ParticipantsDrawer
          isOpen={participantsSwitch}
          toggle={toggleParticipantsDrawer}
          data={data.attendees}
        />
      )}
      {deleteModal && (
        <Modal
          setModal={setDeleteModal}
          onDelete={() => handleDelete(data.id)}
          loading={deleteLoading}
          buttonText='Delete'
          title='Are you sure you want to delete this masterclass?'
        />
      )}
    </>
  ) : (
    <PageLoading />
  );
};

export default index;
