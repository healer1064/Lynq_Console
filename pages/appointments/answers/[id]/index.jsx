// libraries
import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// import moment from "moment";
import Fade from "react-reveal/Fade";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import ProfileContext from "../../../../context/profile";

// icons
import { FaPlay } from "react-icons/fa";

// components
// import Loading from "../../../../components/common/Loading";
import Navbar from "../../../../components/Navbar";
import Leftbar from "../../../../components/Leftbar";
// import PageLoading from "../../../../components/common/PageLoading";
import Modal from "../../../../components/common/Modal";
import VideoModal from "../../../../components/Appointments/Request/VideoModal";

const Answer = () => {
  // router
  const router = useRouter();
  const { id } = router.query;

  // context
  const { token } = useContext(ProfileContext);

  // states
  const [videoModal, setVideoModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // const getFromTime = () => {
  //   let now = moment();
  //   let start = moment(data.create_date);

  //   return start.from(now);
  // };

  return (
    <>
      {videoModal && <VideoModal setVideoModal={setVideoModal} />}
      {deleteModal && (
        <Modal
          setModal={setDeleteModal}
          title="Delete Activity"
          subtitle="Are you sure, you want to delete this?"
          buttonText="Delete"
        />
      )}
      <Head>
        <title>Answer | Lynq</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar active="answers" />
      <ToastContainer />
      <div className="page-wrp">
        <Leftbar active="answers" />
        <div className="content-wrp">
          {/* {!data ? (
            <PageLoading />
          ) : ( */}
          <Fade>
            <br />
            <br />
            <>
              <Fade>
                <div style={{ marginTop: "-30px" }} className="content-wrp">
                  <div className="appointment-request">
                    {/* <h2></h2> */}
                    <span className="received__time">
                      {/* Received: 'no created at field in backend' */}
                      Received: 04-28-2021 - 10:22PM
                    </span>
                    <ToastContainer />
                    <div className="info__col">
                      <strong>Event Name</strong>
                      <p>Full Meditation</p>
                    </div>
                    {/* <div className="info__col">
                      <strong>Price</strong>
                      <p>$60</p>
                    </div> */}
                    <div style={{ display: "flex" }}>
                      <div
                        style={{ marginRight: "30px" }}
                        className="info__col"
                      >
                        <strong>First Name</strong>
                        <p>Chuck</p>
                      </div>
                      <div className="info__col">
                        <strong>Last Name</strong>
                        <p>Norris</p>
                      </div>
                    </div>
                    <div className="info__col">
                      <strong>Email</strong>
                      <p>chucknorris@gmail.com</p>
                    </div>
                    <div className="info__col">
                      <strong>Video file</strong>
                      <div
                        onClick={() => setVideoModal(true)}
                        className="async-download-video"
                      >
                        <FaPlay />
                      </div>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#777",
                          cursor: "pointer",
                        }}
                      >
                        Download Video
                      </span>
                    </div>
                    <div className="info__col">
                      <strong>Information Provided</strong>
                      <p>
                        I need to improve my swing as I can't drive far enough
                      </p>
                    </div>
                    <div className="appointment-request__btns">
                      <button className="reject" onClick={() => router.back()}>
                        {/* {rejectLoading && <Loading color="#fff" />}  */}
                        CANCEL
                      </button>
                      <button
                        className="accept"
                        onClick={() => setDeleteModal(true)}
                      >
                        {/* {acceptLoading && <Loading />} */}
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              </Fade>
            </>
          </Fade>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default Answer;
