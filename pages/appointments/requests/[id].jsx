// libraries
import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import moment from "moment";
import Fade from "react-reveal/Fade";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import ProfileContext from "../../../context/profile";

// components
import Loading from "../../../components/common/Loading";
import RequestDrawer from "../../../components/Appointments/Request/RequestDrawer";
import Navbar from "../../../components/Navbar";
import Leftbar from "../../../components/Leftbar";
import PageLoading from "../../../components/common/PageLoading";

const RequestDetail = () => {
  // router
  const router = useRouter();
  const { id } = router.query;

  // context
  const { token } = useContext(ProfileContext);

  // states
  const [apt, setApt] = useState(null);
  const [data, setData] = useState(null);
  const [requests, setRequests] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [tab, setTab] = useState(router.pathname.toString());

  useEffect(() => {
    if (token) {
      fetchAppointments();
      fetchRequests();
    }
  }, [token]);

  useEffect(() => {
    if (tab == "/appointments/invitations") {
      router.push("/appointments/invitations");
    } else if (tab == "/appointments/requests") {
      router.push("/appointments/requests");
    } else if (tab == "/appointments") {
      router.push("/appointments");
    }
  }, [tab]);

  const fetchRequests = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        `https://api.lynq.app/account/appointments/requests?t=${token}`,
        config
      );
      const _data = await response.json();

      setRequests(_data);
      setData(_data.find((i) => i.id == id));
    } catch (err) {
      toast.error("Error, Failed to Fetch Request List!!!");
    }
  };

  const fetchAppointments = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        `https://api.lynq.app/account/appointments?t=${token}`,
        config
      );

      const _data = await response.json();

      setApt(_data);
    } catch (err) {
      toast.error("Error, Failed to Fetch Appointment List!!!");
      setApt([]);
    }
  };

  const requestAccept = (id) => {
    setAcceptLoading(true);

    async function accept() {
      const response = await fetch(
        `https://api.lynq.app/account/appointments/${id}/accept?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return await response;
    }

    accept()
      .then((res) => {
        setAcceptLoading(false);
        if (res.status === 200) {
          router.back();
        } else {
          toast.error("Error, Failed To Accept Appointment");
        }
      })
      .catch(() => {
        toast.error("Error, Failed To Accept Appointment");
        setAcceptLoading(false);
      });
  };
  const requestReject = (id) => {
    setRejectLoading(true);

    async function reject() {
      const response = await fetch(
        `https://api.lynq.app/account/appointments/${id}/cancel?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return await response;
    }

    reject()
      .then((res) => {
        setRejectLoading(false);
        if (res.status === 200) {
          router.back();
        } else {
          toast.error("Error, Failed To Reject Appointment");
        }
      })
      .catch(() => {
        setRejectLoading(false);
        toast.error("Error, Failed To Reject Appointment");
      });
  };

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
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
          {!data || !apt ? (
            <PageLoading />
          ) : (
            <Fade>
              <div className="settings-types">
                <div
                  onClick={() => router.push("/appointments")}
                  className="option"
                >
                  Scheduled
                </div>
                <div
                  onClick={() => router.push("/appointments/requests")}
                  className="option active"
                  style={{ position: "relative" }}
                >
                  Requests{" "}
                  {requests.length > 0 ? (
                    <span className="requests-badge">{requests.length}</span>
                  ) : null}
                </div>
                <div
                  onClick={() => router.push("/appointments/invitations")}
                  className="option"
                  style={{ position: "relative" }}
                >
                  Invitations (Waiting for payment)
                </div>
              </div>
              <div className="settings-types__mobile">
                <select onChange={(e) => setTab(e.target.value)} value={tab}>
                  <option value={"/appointments"}>Scheduled</option>
                  <option value={"/appointments/requests"}>Requests</option>
                  <option value={"/appointments/invitations"}>
                    Invitations (Waiting for payment)
                  </option>
                </select>
              </div>
              <Fade>
                <div style={{ marginTop: "-30px" }} className="content-wrp">
                  <div className="appointment-request">
                    {isOpen && (
                      <RequestDrawer
                        isOpen={isOpen}
                        toggle={toggleDrawer}
                        apt={apt}
                        day={moment(data.starting_date).format(
                          "ddd, MMM DD, YYYY"
                        )}
                        thatDate={data.starting_date}
                      />
                    )}
                    <a
                      className="appointment-request__back"
                      style={{ cursor: "pointer" }}
                      onClick={() => router.back()}
                    >
                      Back
                    </a>
                    <h2>Appointment Request</h2>
                    <span className="received__time">
                      Received: 'no created at field in backend'
                    </span>
                    <ToastContainer />
                    <div className="info__col">
                      <strong>Event type</strong>
                      <p>{data.activity_name}</p>
                    </div>
                    <div className="info__col">
                      <strong>Duration</strong>
                      <p>{data.session_duration}mins</p>
                    </div>
                    <div className="info__col">
                      <strong>Price</strong>
                      <p>${data.display_price || "0"}</p>
                    </div>
                    <div className="info__col">
                      <strong>Day</strong>
                      <p>
                        {moment(data.starting_date).format(
                          "dddd, MMMM DD, YYYY"
                        )}
                      </p>
                      <span
                        className="see__day"
                        onClick={() => setIsOpen(true)}
                      >
                        See you how your day look like
                      </span>
                    </div>

                    <div className="info__col">
                      <strong>Time</strong>
                      <p>{moment(data.starting_date).format("hh:mm a")}</p>
                    </div>
                    <div className="info__col">
                      <strong>Appointment made by</strong>
                      <p>{`${data.first_name} ${data.last_name}`}</p>
                    </div>
                    <div className="appointment-request__btns">
                      <button
                        className="reject"
                        onClick={() => requestReject(data.id)}
                      >
                        {rejectLoading && <Loading color="#fff" />}REJECT
                      </button>
                      <button
                        className="accept"
                        onClick={() => requestAccept(data.id)}
                      >
                        {acceptLoading && <Loading />}ACCEPT
                      </button>
                    </div>
                  </div>
                </div>
              </Fade>
            </Fade>
          )}
        </div>
      </div>
    </>
  );
};

export default RequestDetail;
