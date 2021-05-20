// libraries
import React, { useState, useContext, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import moment from "moment";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";

// context
import ProfileContext from "../../../../../context/profile";

// icons
import { RiUploadCloudFill, RiDeleteBin6Fill } from "react-icons/ri";

// components
import Loading from "../../../../../components/common/Loading";
import PageLoading from "../../../../../components/common/PageLoading";
import DocumentModal from "../../../../../components/common/DocumentModal";

const AsyncAnswer = () => {
  // router
  const router = useRouter();
  const { id } = router.query;

  // context
  const { token } = useContext(ProfileContext);

  // states
  const [docModal, setDocModal] = useState(false);
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

  const onDrop = useCallback((acceptedFiles) => {
    handleFileInput(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

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

  const handleFileInput = (_file) => {
    // handle validations
    const file = _file;
    if (file) {
      if (file.size > 1536 * 1000000) {
        toast("File size cannot exceed more than 1.5GB");
      } else {
        setSelectedFile({
          videoFileURL: URL.createObjectURL(file),
          videoFileObject: file,
        });
      }
    }
  };

  const handleConfirm = () => {
    if (!selectedFile) {
      setMessageError(false);
      setVideoError(true);
    } else if (info == "") {
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

  console.log(selectedFile);

  return (
    <>
      {docModal && (
        <DocumentModal
          setState={setDocModal}
          data={selectedFile && selectedFile}
        />
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
                      Received:{" "}
                      {moment(async.requestDate).format(
                        "DD-MMM-yyyy - hh:mm a"
                      )}
                    </span>
                    <div className="info__col">
                      <strong>Event Name</strong>
                      <p>{async.activityName}</p>
                    </div>
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
                    <div className="info__col">
                      <strong>Upload your Document</strong>
                      <div className="video-upload-input">
                        {!selectedFile && (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            {...getRootProps()}
                          >
                            <input
                              {...getInputProps()}
                              accept=".mp4,.avi,.mp3,.wav,.pdf,.doc,.docx,.png,.jpeg"
                            />
                            <>
                              <RiUploadCloudFill />
                              <h6>Drop or select your file</h6>
                              <p>
                                Video (mp4, avi), Picture (jpeg, png), Audio
                                (mp3, wav), Document (pdf, docx, doc)
                                <br /> Max 400 MB
                              </p>
                            </>
                          </div>
                        )}
                        {selectedFile && (
                          <>
                            <RiDeleteBin6Fill
                              className="delete-video-icon"
                              size={20}
                              onClick={(e) => {
                                setSelectedFile(null);
                                e.stopPropagation();
                              }}
                            />
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setDocModal(true);
                              }}
                              className="async-download-video"
                            >
                              {selectedFile.videoFileObject.name
                                .toLowerCase()
                                .includes(".mp3") ||
                              selectedFile.videoFileObject.name
                                .toLowerCase()
                                .includes(".wav") ||
                              selectedFile.videoFileObject.name
                                .toLowerCase()
                                .includes(".mp4") ||
                              selectedFile.videoFileObject.name
                                .toLowerCase()
                                .includes(".avi") ? (
                                <img
                                  className="thumbnail"
                                  src="/img/thumb_music.jpeg"
                                  alt="thumb"
                                />
                              ) : selectedFile.videoFileObject.name
                                  .toLowerCase()
                                  .includes(".jpeg") ||
                                selectedFile.videoFileObject.name
                                  .toLowerCase()
                                  .includes(".png") ? (
                                <img
                                  className="thumbnail"
                                  src="/img/thumb_img.jpeg"
                                  alt="thumb"
                                />
                              ) : selectedFile.videoFileObject.name
                                  .toLowerCase()
                                  .includes(".pdf") ? (
                                <img
                                  className="thumbnail"
                                  src="/img/thumb_pdf.jpeg"
                                  alt="thumb"
                                />
                              ) : (
                                <img
                                  className="thumbnail"
                                  src="/img/thumb_file.jpeg"
                                  alt="thumb"
                                />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      {selectedFile && (
                        <p style={{ margin: "10px 0px 0px" }}>
                          {selectedFile.videoFileObject.name}
                        </p>
                      )}
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
                        Please write a description
                      </p>
                    ) : (
                      <></>
                    )}
                    {videoError ? (
                      <p style={{ margin: "10px 0", color: "red" }}>
                        Please select your file
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
