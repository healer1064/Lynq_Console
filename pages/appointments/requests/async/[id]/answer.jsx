// libraries
import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import moment from "moment";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import ProfileContext from "../../../../../context/profile";

// icons
import { RiUploadCloudFill, RiDeleteBin6Fill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";

// components
import Loading from "../../../../../components/common/Loading";
import PageLoading from "../../../../../components/common/PageLoading";
import VideoModal from "../../../../../components/Appointments/Request/VideoModal";

const AsyncAnswer = () => {
  // router
  const router = useRouter();
  const { id } = router.query;

  // context
  const { token } = useContext(ProfileContext);

  // states
  const [videoModal, setVideoModal] = useState(false);
  const [info, setInfo] = useState("");
  const [infoCount, setInfoCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [async, setAsync] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    if (token) {
      fetchAsync();
    }
  }, [token]);

  const fetchAsync = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        `https://api.lynq.app/async/requests?t=${token}`,
        config
      );
      const _data = await response.json();
      setAsync(_data.content.find((as) => as.id == id));
    } catch (err) {
      console.log(err);
      toast.error("Error, Failed to Fetch Asynchronous List!");
    }
  };

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

  const handleConfirm = () => {
    if (!selectedFile) {
      setMessageError(false);
      setVideoError(true);
    } else if (info.length < 10) {
      setMessageError(true);
      setVideoError(false);
    } else {
      setMessageError(false);
      setVideoError(false);
      setLoading(true);
      uploadVideo(selectedFile.videoFileObject);
    }
  };

  const uploadVideo = (videoFile) => {
    async function upload() {
      var formData = new FormData();
      formData.append("image", videoFile);

      const response = await fetch(
        `https://api.lynq.app/async/${id}/upload?t=${token}`,
        {
          method: "POST",
          body: formData,
        }
      );

      return await response.json();
    }

    upload()
      .then((res) => {
        handleMessage();
        console.log("video upload", res);
      })
      .catch((res) => {
        console.log("error video upload", res);
        toast.error("An error has occurred while uploading video");
      });
  };

  const handleMessage = async () => {
    async function send() {
      const _reqData = {
        file: "string",
        content: info,
      };

      const response = await fetch(
        `https://api.lynq.app/async/${id}/message?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(_reqData),
        }
      );

      return await response.json();
    }

    send()
      .then((res) => {
        console.log("message sent", res);
        setLoading(false);
        toast.success("Your answer has been sent!");
        router.push("/appointments/requests");
      })
      .catch(() => {
        toast.error("Error, Failed To Send Info to Client.");
      });
  };

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
      <div className="content-wrp">
        {!async ? (
          <PageLoading />
        ) : (
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
                      Received:{" "}
                      {moment(async.requestDate).format(
                        "DD-MMM-yyyy - hh:mm a"
                      )}
                    </span>

                    <div className="info__col">
                      <strong>Event Name</strong>
                      <p>{async.activityName}</p>
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
                        <p>{async.customerFirstName}</p>
                      </div>
                      <div className="info__col">
                        <strong>Last Name</strong>
                        <p>{async.customerLastName}</p>
                      </div>
                    </div>
                    <div className="info__col">
                      <strong>Email</strong>
                      <p>{async.customerEmail}</p>
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
                              <FaPlay color="black" />
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
                    {messageError ? (
                      <p style={{ margin: "10px 0", color: "red" }}>
                        Please write more than 10 characters
                      </p>
                    ) : (
                      <></>
                    )}
                    {videoError ? (
                      <p style={{ margin: "10px 0", color: "red" }}>
                        Please select a video file
                      </p>
                    ) : (
                      <></>
                    )}
                    <div className="appointment-request__btns">
                      <button
                        className="reject"
                        // onClick={() => requestReject(data.id)}
                        onClick={() => router.push("/appointments/requests")}
                      >
                        {/* {rejectLoading && <Loading color="#fff" />}  */}
                        CANCEL
                      </button>
                      <button className="accept" onClick={handleConfirm}>
                        {loading && <Loading />}
                        ANSWER
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

export default AsyncAnswer;
