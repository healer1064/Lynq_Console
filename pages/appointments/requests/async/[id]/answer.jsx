// libraries
import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import moment from "moment";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import ProfileContext from "../../../../../context/profile";

// requests
import {
  fetchAsyncReq,
  uploadFileReq,
  uploadMessageReq,
} from "../../../../../utils/requests/async";

// components
import Dropzone from "../../../../../components/Appointments/Answers/Dropzone";
import DocumentModal from "../../../../../components/common/DocumentModal";
import PageLoading from "../../../../../components/common/PageLoading";
import Loading from "../../../../../components/common/Loading";

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

  useEffect(() => {
    if (token) {
      fetchAsyncReq(token)
        .then((res) => setAsync(res.content.find((as) => as.id == id)))
        .catch(() => toast.error("Failed to fetch Asynchronous List"));
    }
  }, [token]);

  const handleConfirm = () => {
    if (!selectedFile) {
      toast.error("Please select your file");
    } else {
      setLoading(true);
      uploadFileReq(id, token, selectedFile.videoFileObject)
        .then(() => {
          uploadMessageReq(token, id, info)
            .then(() => {
              setLoading(false);
              toast.success("Your answer has been sent!");
              router.push("/appointments/requests");
            })
            .catch(() => {
              setLoading(false);
              toast.error("Failed to send info to client.");
            });
        })
        .catch(() => {
          setLoading(false);
          toast.error("Failed to send your file to client.");
        });
    }
  };

  return (
    <>
      <Head>
        <title>
          {async
            ? `${async.customerFirstName} ${async.customerLastName} | Asychronous Answer | Lynq`
            : "Asychronous Answer | Lynq"}
        </title>
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
                      <Dropzone
                        selectedFile={selectedFile}
                        // handleFileInput={handleFileInput}
                        setSelectedFile={setSelectedFile}
                      />
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
      {docModal && (
        <DocumentModal
          setState={setDocModal}
          data={selectedFile && selectedFile}
        />
      )}
    </>
  );
};

export default AsyncAnswer;
