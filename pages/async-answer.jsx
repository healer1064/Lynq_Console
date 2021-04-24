// libraries
import React, { useState, useContext, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import moment from "moment";
import Fade from "react-reveal/Fade";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import ProfileContext from "../context/profile";

// icons
import { RiUploadCloudFill, RiDeleteBin6Fill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";

// components
// import Loading from "../../../../components/common/Loading";
import Navbar from "../components/Navbar";
import Leftbar from "../components/Leftbar";
// import PageLoading from "../../../../components/common/PageLoading";
import VideoModal from "../components/Appointments/Request/VideoModal";

const AsyncAnswer = () => {
  // router
  const router = useRouter();
  const { id } = router.query;

  // context
  const { token } = useContext(ProfileContext);

  // states
  const [tab, setTab] = useState(router.pathname.toString());
  const [videoModal, setVideoModal] = useState(false);
  const [info, setInfo] = useState("");
  const [infoCount, setInfoCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  // ref
  const fileInput = useRef(null);

  useEffect(() => {
    if (tab == "/appointments/invitations") {
      router.push("/appointments/invitations");
    } else if (tab == "/appointments/requests") {
      router.push("/appointments/requests");
    } else if (tab == "/appointments") {
      router.push("/appointments");
    }
  }, [tab]);

  const handleFileInput = (e) => {
    // handle validations
    const file = e.target.files.length && e.target.files[0];
    if (file.size > 1536 * 1000000) {
      toast("File size cannot exceed more than 1.5GB");
    } else {
      setSelectedFile({
        videoFileURL: URL.createObjectURL(file),
        videoFileObject: file,
      });
    }
  };

  // const getFromTime = () => {
  //   let now = moment();
  //   let start = moment(data.create_date);

  //   return start.from(now);
  // };

  console.log(selectedFile);

  return (
    <>
      {videoModal && (
        <VideoModal setVideoModal={setVideoModal} source={selectedFile} />
      )}
      <Head>
        <title>Appointments</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar active="appointments" />
      <ToastContainer />
      <div className="page-wrp">
        <Leftbar active="appointments" />
        <div className="content-wrp">
          {/* {!data ? (
            <PageLoading />
          ) : ( */}
          <Fade>
            <>
              <Fade>
                <div style={{ marginTop: "-30px" }} className="content-wrp">
                  <div className="appointment-request">
                    <a
                      className="appointment-request__back"
                      style={{ cursor: "pointer", marginTop: "40px" }}
                      onClick={() => router.back()}
                    >
                      Back
                    </a>
                    <h2>Appointment Request</h2>
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
                    {/* <div className="info__col">
                      <strong>Information Provided</strong>
                      <p>
                        I need to improve my swing as I can't drive far enough
                      </p>
                    </div> */}
                    <div className="info__col">
                      <strong>Upload your Video</strong>
                      <label className="video-upload-input">
                        <input
                          disabled={selectedFile}
                          type="file"
                          accept=".mp4,.avi"
                          onChange={handleFileInput}
                        />
                        {selectedFile ? (
                          <>
                            <RiDeleteBin6Fill
                              className="delete-video-icon"
                              size={20}
                              onClick={() => setSelectedFile(null)}
                            />
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setVideoModal(true);
                              }}
                              className="async-download-video"
                            >
                              <FaPlay color="white" />
                            </div>
                          </>
                        ) : (
                          <>
                            <RiUploadCloudFill />
                            <h6>Drop your video or select file</h6>
                            <p>
                              Please upload mp4 or avi files only <br /> Max 1.5
                              GB
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                    <div className="info__col">
                      <strong>Other information</strong>
                      <div className="video-upload-textarea">
                        <textarea
                          maxLength="300"
                          value={info}
                          onChange={(e) => {
                            setInfoCount(e.target.value.length);
                            setInfo(e.target.value);
                          }}
                          placeholder="300 Characters max"
                        ></textarea>
                        <div className="count">{infoCount}/300</div>
                      </div>
                    </div>
                    <div className="appointment-request__btns">
                      <button
                        className="reject"
                        // onClick={() => requestReject(data.id)}
                      >
                        {/* {rejectLoading && <Loading color="#fff" />}  */}
                        CANCEL
                      </button>
                      <button
                        className="accept"
                        onClick={() => router.push("/async-answer")}
                      >
                        {/* {acceptLoading && <Loading />} */}
                        ANSWER
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

export default AsyncAnswer;
