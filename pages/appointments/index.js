// libraries
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import Fade from "react-reveal/Fade";

// components
import Navbar from "../../components/Navbar";
import AppointmentsTop from "../../components/Appointments/AppointmentsTop";
import Leftbar from "../../components/Leftbar";
import AppointmentsList from "../../components/Appointments/AppointmentsList";
import RequestList from "../../components/Appointments/Request/RequestList";
import PageLoading from "../../components/common/PageLoading";

// context
import ProfileContext from "../../context/profile";

// helpers
import { getCurrentWeek } from "../../utils/DateHelper";

export default function Appointments() {
  const { token } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);
  const [apt, setApt] = useState(null);
  const [requests, setRequests] = useState(null);
  const [temp, setTemp] = useState([]);
  const [tabIndex, setTabIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("linqToken") === null &&
      localStorage == undefined
    ) {
      router.push("/login");
    }
    if (token) {
      fetchAppointments();
      fetchRequests();
    }
  }, [token]);

  const fetchAppointments = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `https://api.lynq.app/account/appointments?t=${token}`,
      config
    );

    const _data = await response.json();

    setApt(_data);

    setData(filterByCurrWeek(groupAppointment(_data)));
    setTemp(groupAppointment(_data));
  };

  const fetchRequests = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `http://api.lynq.app/account/appointments/requests?t=${token}`,
      config
    );
    const _data = await response.json();

    setRequests(_data);
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

  const onAccept = (id) => {
    setLoading(true);

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

    accept().then((res) => {
      console.log("res accept", res);
      setLoading(false);
      if (res.status === 200) {
        setTabIndex(1);
      } else {
        // toast.error(res.message);
        console.log(res.message);
      }
    });
  };
  const onReject = (id) => {
    setLoading(true);

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

    reject().then((res) => {
      console.log("res reject", res);
      setLoading(false);
      if (res.status === 200) {
        setTabIndex(1);
      } else {
        // toast.error(res.message);
        console.log(res.message);
      }
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
      <div className="page-wrp">
        <Leftbar active="appointments" />
        <div className="content-wrp">
          {!data || !requests ? (
            <PageLoading />
          ) : (
            <Fade>
              <div className="settings-types">
                <div
                  onClick={() => setTabIndex(1)}
                  className={`option ${tabIndex == 1 && "active"}`}
                >
                  Scheduled
                </div>
                <div
                  onClick={() => setTabIndex(2)}
                  className={`option ${tabIndex == 2 && "active"}`}
                  style={{ position: "relative" }}
                >
                  Requests{" "}
                  {requests.length > 0 ? (
                    <span className="requests-badge">{requests.length}</span>
                  ) : null}
                </div>
              </div>
              <div className="settings-types__mobile">
                <select
                  onChange={(e) => setTabIndex(e.target.value)}
                  value={tabIndex}
                >
                  <option value={1}>Scheduled</option>
                  <option value={2}>Requests</option>
                </select>
              </div>
              {tabIndex == 1 ? (
                <>
                  <Fade duration={1200}>
                    <div>
                      <AppointmentsTop onWeekChange={onWeekChange} />
                      <AppointmentsList appointmentList={data} />
                    </div>
                  </Fade>
                </>
              ) : (
                <>
                  <RequestList
                    requestList={requests}
                    apt={apt}
                    requestAccept={onAccept}
                    requestReject={onReject}
                    loading={loading}
                  />
                </>
              )}
            </Fade>
          )}
        </div>
      </div>
    </>
  );
}
