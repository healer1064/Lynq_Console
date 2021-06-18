// libraries
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import Fade from "react-reveal/Fade";

// context
import ProfileContext from "@/context/profile";

// styles
import styles from "./styles.module.sass";

// icons
import { BsChevronLeft } from "react-icons/bs";

// requests
import { postAcceptReq, postRejectReq } from "@/utils/requests/calls/requests";

// components
import Drawer from "@/components/Calls/SingleRequest/Drawer";
import Modal from "@/components/common/Modal";
import Loading from "@/components/common/Loading";

const index = ({ request }) => {
  // context
  const { token } = useContext(ProfileContext);

  // router
  const router = useRouter();

  // states
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  // drawer toggle
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // handle accept
  const handleAccept = (_id) => {
    setAcceptLoading(true);
    postAcceptReq(token, _id)
      .then((res) => {
        setAcceptLoading(false);
        if (res.status === 200) {
          router.back();
        } else {
          toast.error("Failed to accept the request!");
        }
      })
      .catch(() => {
        setAcceptLoading(false);
        toast.error("Failed to accept the request!");
      });
  };

  // handle reject
  const handleReject = (_data) => {
    setRejectLoading(true);
    postRejectReq(token, _data.id)
      .then((res) => {
        setRejectLoading(false);
        if (res.status === 200) {
          setDeleteModal(false);
          router.back();
        } else {
          toast.error(
            `Failed to ${
              new Date(request.ending_date) > new Date() ? "reject" : "delete"
            } the request!`
          );
        }
      })
      .catch(() => {
        setRejectLoading(false);
        toast.error(
          `Failed to ${
            new Date(request.ending_date) > new Date() ? "reject" : "delete"
          } the request!`
        );
      });
  };

  return (
    <>
      <Fade>
        <div className={styles.request}>
          <a className={styles.back} onClick={() => router.back()}>
            <BsChevronLeft /> Back
          </a>
          <h2>Call Request</h2>
          <span className={styles.received_time}>
            Received: {moment(request.create_date).fromNow()}
          </span>
          {new Date(request.ending_date) < new Date() && (
            <p className={styles.expired}>Expired</p>
          )}
          <div className={styles.info_col}>
            <strong>Name</strong>
            <p>{request.activity_name}</p>
          </div>
          <div className={styles.info_col}>
            <strong>Duration</strong>
            <p>{request.session_duration}mins</p>
          </div>
          <div className={styles.info_col}>
            <strong>Price</strong>
            <p>${request.display_price || "0"}</p>
          </div>
          <div className={styles.info_col}>
            <strong>Day</strong>
            <p>{moment(request.starting_date).format("dddd, MMMM DD, YYYY")}</p>
            <span className={styles.see_day} onClick={() => setIsOpen(true)}>
              See you how your day looks like
            </span>
          </div>
          <div className={styles.info_col}>
            <strong>Time</strong>
            <p>{moment(request.starting_date).format("hh:mm a")}</p>
          </div>
          <div className={styles.info_col}>
            <strong>Request made by</strong>
            <p>{`${request.first_name} ${request.last_name}`}</p>
          </div>
          <div className={styles.info_col}>
            <strong>Description</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
              qui. Accusamus quibusdam architecto soluta eius recusandae, saepe
              alias quasi velit corrupti fuga ex distinctio ut porro. Autem nisi
              exercitationem nulla.
            </p>
          </div>
          <div className={styles.btns}>
            <button
              className={`${styles.reject} ${
                new Date(request.ending_date) > new Date() ? "" : styles.delete
              }`}
              onClick={() => setDeleteModal(true)}
            >
              {new Date(request.ending_date) > new Date() ? "REJECT" : "DELETE"}
            </button>
            {new Date(request.ending_date) > new Date() && (
              <button
                className={styles.accept}
                onClick={() => handleAccept(request.id)}
              >
                {acceptLoading && <Loading />}
                ACCEPT
              </button>
            )}
          </div>
        </div>
      </Fade>
      {isOpen && (
        <Drawer
          isOpen={isOpen}
          toggle={toggleDrawer}
          day={request.starting_date}
        />
      )}
      {deleteModal && (
        <Modal
          setModal={setDeleteModal}
          title="Delete the request"
          subtitle="Are you sure you want to delete the request?"
          buttonText="Delete"
          date={request.starting_date}
          loading={rejectLoading}
          onDelete={() => handleReject(request)}
        />
      )}
    </>
  );
};

export default index;
