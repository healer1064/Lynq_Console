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
import { FaPlay } from "react-icons/fa";

// components
import PageLoading from "../../../../../components/common/PageLoading";
import VideoModal from "../../../../../components/Appointments/Request/VideoModal";
import VideoPreview from "../../../../../components/common/VideoPreview/VideoPreview";

let test1 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

let test2 =
  "http://lynq-app.storage.googleapis.com/ff8080817969b771017969baeefb0000/bandicam%202021-02-05%2003-22-52-994.mp4";

const Async = () => {
  // router
  const router = useRouter();
  const { id } = router.query;

  // context
  const { token } = useContext(ProfileContext);

  // states
  const [videoModal, setVideoModal] = useState(false);
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
      console.log(_data);
      setAsync(_data.content.find((as) => as.id == id));
    } catch (err) {
      console.log(err);
      toast.error("Error, Failed to Fetch Asynchronous List!");
    }
  };

  console.log(async);

  return (
    <>
      {videoModal &&
        // <VideoModal
        //   setVideoModal={setVideoModal}
        //   source={async && async.content[0].fileUrl}
        // />
        null}
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
                    <div className="info__col">
                      <strong>Information Provided</strong>
                      <p>{async?.content[1]?.content}</p>
                    </div>
                    <div className="info__col">
                      <strong>Video file</strong>
                      <VideoPreview url={test2} />
                      {/* <div
                        onClick={() => setVideoModal(true)}
                        className="async-download-video"
                      >
                        <FaPlay color="black" />
                      </div> */}
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
