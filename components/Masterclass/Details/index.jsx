// libraries
import { useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import Fade from "react-reveal/Fade";

// styles
import styles from "./styles.module.sass";

// icons
import { BsChevronLeft } from "react-icons/bs";

// components
import AppointmentsDrawer from "@/components/Calls/SingleRequest/Drawer";
import ParticipantsDrawer from "@/components/Masterclass/Details/Drawer";

const index = () => {
  // router
  const router = useRouter();

  // states
  const [apptSwitch, setApptSwitch] = useState(false);
  const [participantsSwitch, setParticipantsSwitch] = useState(false);

  // appointment drawer toggle
  const toggleApptsDrawer = () => {
    setApptSwitch(!apptSwitch);
  };

  // participants drawer toggle
  const toggleParticipantsDrawer = () => {
    setParticipantsSwitch(!participantsSwitch);
  };

  return (
    <>
      <Fade>
        <div className={styles.request}>
          <a className={styles.back} onClick={() => router.back()}>
            <BsChevronLeft /> Back
          </a>
          <h2>Appointment Request</h2>
          <span className={styles.received_time}>Received: 22 hours ago</span>
          <div className={styles.info_col}>
            <strong>Title</strong>
            <p>Test Activity</p>
          </div>
          <div className={styles.info_col}>
            <strong>Day</strong>
            <p>{moment().format("dddd, MMMM DD, YYYY")}</p>
            <span
              className={styles.see_day}
              onClick={() => setApptSwitch(true)}
            >
              See you how your day look like
            </span>
          </div>
          <div className={styles.info_col}>
            <strong>Time</strong>
            <p>{moment().format("hh:mm a")}</p>
          </div>
          <div className={styles.info_col}>
            <strong>Length</strong>
            <p>60 mins</p>
          </div>
          <div className={styles.info_col}>
            <strong>Price</strong>
            <p>$50</p>
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
          <div className={styles.info_col}>
            <strong>Participants</strong>
            <p
              onClick={toggleParticipantsDrawer}
              className={styles.participants}
            >
              16
            </p>
          </div>
          <div className={styles.info_col}>
            <strong>Revenue</strong>
            <p>$50</p>
          </div>

          <div className={styles.btns}>
            <button className={styles.edit}>
              {/* {loading && <Loading color="#fff" />} */}
              EDIT
            </button>
            <button className={styles.delete}>
              {/* {loading && <Loading />} */}
              DELETE
            </button>
          </div>
        </div>
      </Fade>
      {apptSwitch && (
        <AppointmentsDrawer
          isOpen={apptSwitch}
          toggle={toggleApptsDrawer}
          //   apt={apt}
          day={moment().format("ddd, MMM DD, YYYY")}
          //   thatDate={data.starting_date}
        />
      )}
      {participantsSwitch && (
        <ParticipantsDrawer
          isOpen={participantsSwitch}
          toggle={toggleParticipantsDrawer}
          data={[1, 2, 3, 4, 5, 6, 7]}
        />
      )}
    </>
  );
};

export default index;
