// libraries
import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import moment from "moment";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";

// styles
import "react-toastify/dist/ReactToastify.css";

// context
import ProfileContext from "../../../../../context/profile";

// components
import PageLoading from "../../../../../components/common/PageLoading";
import DocumentModal from "../../../../../components/common/DocumentModal";

const Async = () => {
  // router
  const router = useRouter();
  const { id } = router.query;

  // context
  const { token } = useContext(ProfileContext);

  // states
  const [docModal, setDocModal] = useState(false);
  const [async, setAsync] = useState(null);

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

  const handleClick = (url) => {
    const link = document.createElement("a");
    link.href = changeHead(url);
    link.download = "video";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const changeHead = (_str) => {
    if (_str.indexOf("https") === -1) {
      _str = _str.replace("http", "https");
    }
    return _str;
  };

  return (
    <>
      {docModal && (
        <DocumentModal
          setState={setDocModal}
          data={async && async?.content[0].fileUrl}
        />
      )}
      <Head>
        <title>Async | Lynq</title>
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
                    <div className="info__col">
                      <strong>Price</strong>
                      <p>${async.basePrice}</p>
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
                    {async?.content.length > 0 ? (
                      <>
                        <div className="info__col">
                          <strong>Information Provided</strong>
                          <p>{async.content[1].content}</p>
                        </div>
                        <div className="info__col">
                          <strong>Document</strong>
                          <div
                            onClick={() => setDocModal(true)}
                            className="async-download-video"
                            style={{ justifyContent: "flex-start" }}
                          >
                            <img
                              src={
                                async.content[0].fileName
                                  .toLowerCase()
                                  .includes(".mp3") ||
                                async.content[0].fileName
                                  .toLowerCase()
                                  .includes(".mp4") ||
                                async.content[0].fileName
                                  .toLowerCase()
                                  .includes(".wav") ||
                                async.content[0].fileName
                                  .toLowerCase()
                                  .includes(".avi")
                                  ? "/img/thumb_music.jpeg"
                                  : async.content[0].fileName
                                      .toLowerCase()
                                      .includes(".jpeg") ||
                                    async.content[0].fileName
                                      .toLowerCase()
                                      .includes(".png")
                                  ? "/img/thumb_img.jpeg"
                                  : async.content[0].fileName
                                      .toLowerCase()
                                      .includes(".pdf")
                                  ? "/img/thumb_pdf.jpeg"
                                  : "/img/thumb_file.jpeg"
                              }
                              alt="doc"
                              style={{ height: "100%" }}
                            />
                          </div>
                          <p
                            style={{
                              fontSize: "0.8rem",
                              color: "#333",
                            }}
                          >
                            {async.content[0].fileName}
                          </p>

                          <span
                            onClick={() =>
                              handleClick(async.content[0].fileUrl)
                            }
                            style={{
                              fontSize: "0.9rem",
                              color: "#7E88F4",
                              cursor: "pointer",
                              marginTop: "10px",
                            }}
                          >
                            Download
                          </span>
                        </div>
                      </>
                    ) : (
                      <p style={{ color: "#7E88F4" }}>
                        The client has not provided anything
                      </p>
                    )}

                    <div className="appointment-request__btns">
                      <button className="reject">CANCEL</button>
                      <button
                        className="accept"
                        onClick={() =>
                          router.push(
                            `/appointments/requests/async/${id}/answer`
                          )
                        }
                      >
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

export default Async;
