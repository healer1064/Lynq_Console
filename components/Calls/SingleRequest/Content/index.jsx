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
import Drawer from "@/components/Calls/SingleRequest/Drawer";

const index = () => {
  // router
  const router = useRouter();

  // states
  const [isOpen, setIsOpen] = useState(false);

  // drawer toggle
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Fade>
        <div className={styles.request}>
          <a className={styles.back} onClick={() => router.back()}>
            <BsChevronLeft /> Back
          </a>
          <h2>Appointment Request</h2>
          <span className={styles.received_time}>
            Received: 22 hours ago
            {/* Received: {getFromTime()} */}
          </span>
          {/* {new Date() < new Date() && (
            <p
              style={{
                fontStyle: "italic",
                color: "#777",
                fontSize: "1rem",
                marginTop: "-7px",
              }}
            >
              Expired
            </p>
          )} */}
          <div className={styles.info_col}>
            <strong>Event type</strong>
            <p>Test Activity</p>
            {/* <p>{data.activity_name}</p> */}
          </div>
          <div className={styles.info_col}>
            <strong>Duration</strong>
            <p>60 mins</p>
            {/* <p>{data.session_duration}mins</p> */}
          </div>
          <div className={styles.info_col}>
            <strong>Price</strong>
            <p>$50</p>
            {/* <p>${data.display_price || "0"}</p> */}
          </div>
          <div className={styles.info_col}>
            <strong>Day</strong>
            <p>{moment().format("dddd, MMMM DD, YYYY")}</p>
            {/* <p>{moment(data.starting_date).format("dddd, MMMM DD, YYYY")}</p> */}
            <span className={styles.see_day} onClick={() => setIsOpen(true)}>
              See you how your day look like
            </span>
          </div>
          <div className={styles.info_col}>
            <strong>Time</strong>
            <p>{moment().format("hh:mm a")}</p>
            {/* <p>{moment(data.starting_date).format("hh:mm a")}</p> */}
          </div>
          <div className={styles.info_col}>
            <strong>Appointment made by</strong>
            <p>Test Name</p>
            {/* <p>{`${data.first_name} ${data.last_name}`}</p> */}
          </div>
          <div className={styles.info_col}>
            <strong>Description</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
              qui. Accusamus quibusdam architecto soluta eius recusandae, saepe
              alias quasi velit corrupti fuga ex distinctio ut porro. Autem nisi
              exercitationem nulla.
            </p>
            {/* <p>{`${data.first_name} ${data.last_name}`}</p> */}
          </div>
          <div className={styles.btns}>
            <button
              className={styles.reject}
              // onClick={() => requestReject(data.id)}
            >
              {/* {rejectLoading && <Loading color="#fff" />} */}
              {/* {new Date(data.ending_date) > new Date() ? "REJECT" : "DELETE"} */}
              REJECT
            </button>
            {/* {new Date(data.ending_date) > new Date() && ( */}
            <button
              className={styles.accept}
              //    onClick={() => requestAccept(data.id)}
            >
              {/* {acceptLoading && <Loading />} */}
              ACCEPT
            </button>
            {/* )} */}
          </div>
        </div>
      </Fade>
      {isOpen && (
        <Drawer
          isOpen={isOpen}
          toggle={toggleDrawer}
          //   apt={apt}
          day={moment().format("ddd, MMM DD, YYYY")}
          //   thatDate={data.starting_date}
        />
      )}
    </>
  );
};

export default index;
