// libraries
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Navbar from "../../../components/Navbar";
import Leftbar from "../../../components/Leftbar";
import RequestList from "../../../components/Appointments/Request/RequestList";
import PageLoading from "../../../components/common/PageLoading";

// context
import ProfileContext from "../../../context/profile";

export default function Appointments() {
  // router
  const router = useRouter();

  // context
  const { token } = useContext(ProfileContext);

  // states
  const [requests, setRequests] = useState(null);
  const [success, setSuccess] = useState(false);
  const [tab, setTab] = useState(router.pathname.toString());

  useEffect(() => {
    if (token) {
      fetchRequests();
    }
  }, [token, success]);

  useEffect(() => {
    if (tab == "/appointments/invitations") {
      router.push("/appointments/invitations");
    } else if (tab == "/appointments/requests") {
      router.push("/appointments/requests");
    } else {
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
    } catch (err) {
      setRequests([]);
      toast.error("Error, Failed to Fetch Request List!!!");
    }
  };

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
          {!requests ? (
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

              <RequestList
                requestList={requests}
                success={success}
                setSuccess={setSuccess}
              />
            </Fade>
          )}
        </div>
      </div>
    </>
  );
}
