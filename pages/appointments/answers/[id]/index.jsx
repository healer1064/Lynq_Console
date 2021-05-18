// libraries
import { useState, useContext, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import moment from "moment";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPlayer from "react-player";

// context
import ProfileContext from "../../../../context/profile";

// components
import Loading from "../../../../components/common/Loading";
import PageLoading from "../../../../components/common/PageLoading";
import Modal from "../../../../components/common/Modal";
import VideoModal from "../../../../components/Appointments/Request/VideoModal";

const Answer = () => {
  // router
  const router = useRouter();
  const { id } = router.query;

  // context
  const { token } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);
  const [videoModal, setVideoModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // ref
  const playerRef = useRef(null);

  useEffect(() => {
    if (token) {
      fetchAnswers();
    }
  }, [token]);

  const fetchAnswers = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch(
        `https://api.lynq.app/async/requests/archived?t=${token}`,
        config
      );
      const _data = await response.json();
      setData(_data.content.find((a) => a.id == id));
    } catch (err) {
      toast.error("Error, Failed to Fetch Answers List!");
    }
  };

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

      <div className="content-wrp">
        {!data ? (
          <PageLoading />
        ) : (
          <Fade>
            <br />
            <br />
            <>
              <Fade>
                <div style={{ marginTop: "-30px" }} className="content-wrp">
                  <div className="appointment-request">
                    <a
                      className="appointment-request__back"
                      style={{ cursor: "pointer" }}
                      onClick={() => router.back()}
                    >
                      Back
                    </a>
                    <span className="received__time">
                      Received:{" "}
                      {moment(data.requestDate).format(
                        "dddd, DD MMM, YYYY - hh:mm a"
                      )}
                    </span>
                    <span className="sent__time">
                      {/* Received: 'no created at field in backend' */}
                      Answer sent: [No field for when it is answered]
                    </span>
                    <div className="info__col">
                      <strong>Event Name</strong>
                      <p>{data.activityName}</p>
                    </div>
                    <div className="info__col">
                      <strong>Answer</strong>
                      <p>{data.packageName}: [no duration field] days</p>
                      <p>Time Limit: [No duration field]</p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{ marginRight: "30px" }}
                        className="info__col"
                      >
                        <strong>First Name</strong>
                        <p>{data.customerFirstName}</p>
                      </div>
                      <div className="info__col">
                        <strong>Last Name</strong>
                        <p>{data.customerLastName}</p>
                      </div>
                    </div>
                    <div className="info__col">
                      <strong>Email</strong>
                      <p>{data.customerEmail}</p>
                    </div>
                    <div className="info__col">
                      <strong
                        style={{
                          marginBottom: "16px",
                        }}
                      >
                        Video file
                      </strong>
                      <div
                        onClick={() => {
                          setVideoModal(true);
                        }}
                        className="async-download-video"
                      >
                        {/* <FaPlay /> */}
                        <ReactPlayer
                          url={data.content[2].fileUrl}
                          width={170}
                          height={100}
                          light={true}
                          ref={playerRef}
                        />
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
                      <p>{data.content[3].content}</p>
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
        )}
      </div>
    </>
  );
};

export default Answer;
