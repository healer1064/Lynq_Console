// libraries
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Navbar from "../../components/Navbar";
import AppointmentsTop from "../../components/Appointments/AppointmentsTop";
import Leftbar from "../../components/Leftbar";
import AppointmentsList from "../../components/Appointments/AppointmentsList";
import PageLoading from "../../components/common/PageLoading";
import Modal from "../../components/common/Modal";

// context
import ProfileContext from "../../context/profile";

// helpers
import { getCurrentWeek } from "../../utils/DateHelper";

export default function Appointments() {
  // router
  const router = useRouter();

  // context
  const { token } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);
  const [requests, setRequests] = useState(null);
  const [temp, setTemp] = useState([]);
  const [tab, setTab] = useState(router.pathname.toString());
  const [success, setSuccess] = useState(false);
  const [id, setId] = useState();
  const [showModel, setShowModel] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [apptData, setApptData] = useState(null);

  useEffect(() => {
    if (token) {
      fetchAppointments();
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

      setData(filterByCurrWeek(groupAppointment(_data)));
      setTemp(groupAppointment(_data));
    } catch (err) {
      toast.error("Error, Failed to Fetch Appointment List!!!");
      setData([]);
    }
  };

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

  const groupAppointment = (data) => {
    let groupArrays = [];
    const groups = data.reduce((groups, appointment) => {
      const date = appointment.starting_date.split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(appointment);
      return groups;
    }, {});

    groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        appointments: groups[date],
      };
    });

    return groupArrays;
  };

  const filterByCurrWeek = (list) => {
    let { weekStart, weekEnd } = getCurrentWeek();

    let filter = list.filter(
      (item) =>
        new Date(item.date).getTime() >= weekStart.getTime() &&
        new Date(item.date).getTime() <= weekEnd.getTime()
    );

    return filter;
  };

  const onWeekChange = (_start, _end) => {
    let filter = temp.filter(
      (item) =>
        new Date(item.date).getTime() >= _start.getTime() &&
        new Date(item.date).getTime() <= _end.getTime()
    );

    setData(filter);
  };

  const toggleSuccess = () => {
    setSuccess(!success);
  };

  const toggle = (_data) => {
    setShowModel(true);
    setId(_data._id);
    setApptData(_data);
  };

  const onDelete = () => {
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
          setShowModel(false);
          toggleSuccess();
        } else {
          toast.error("Something went wrong!!, appointment cancel failed");
        }
      })
      .catch((err) => {
        setRejectLoading(false);
        toast.error("Something went wrong!!, appointment cancel failed");
      });
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
          {!data || !requests ? (
            <PageLoading />
          ) : (
            <>
              {showModel && (
                <Modal
                  setModal={setShowModel}
                  onDelete={onDelete}
                  loading={rejectLoading}
                  data={apptData}
                />
              )}
              <Fade>
                <div className="settings-types">
                  <div
                    onClick={() => router.push("/appointments")}
                    className="option active"
                  >
                    Scheduled
                  </div>
                  <div
                    onClick={() => router.push("/appointments/requests")}
                    className="option"
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
                <Fade duration={1200}>
                  <div>
                    <AppointmentsTop onWeekChange={onWeekChange} />
                    <AppointmentsList
                      appointmentList={data}
                      toggleSuccess={toggleSuccess}
                      toggle={toggle}
                    />
                  </div>
                </Fade>
              </Fade>
            </>
          )}
        </div>
      </div>
    </>
  );
}
