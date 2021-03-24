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

import {
  getCurrentWeek,
  getNextWeek,
  getPreviousWeek,
} from "../../utils/DateHelper";

// fake data
import fakedata from "../../utils/data";

const AppointmentData = [
  {
    id: "11",
    profile_id: "642dfee1-57f4-4c4d-b0cc-39742ce9117b",
    starting_date: "2021-03-14T17:23:34",
    ending_date: "2021-03-20T17:23:34.000+00:00",
    activity_id: "10-10",
    status: "CONFIRMED",
    price: 10,
    email: "lamine.lang@outlook.com",
    stripe_payment_intent_id: null,
    stripe_payment_secret_id: null,
    first_name: "lamine",
    last_name: "lang",
  },
  {
    id: "13",
    profile_id: "642dfee1-57f4-4c4d-b0cc-39742ce9117b",
    starting_date: "2021-03-28T17:23:34",
    ending_date: "2021-04-3T17:23:34.000+00:00",
    activity_id: "10-10",
    status: "CONFIRMED",
    price: 10,
    email: "lamine.lang@outlook.com",
    stripe_payment_intent_id: null,
    stripe_payment_secret_id: null,
    first_name: "lamine",
    last_name: "lang",
  },
  {
    id: "15",
    profile_id: "642dfee1-57f4-4c4d-b0cc-39742ce9117b",
    starting_date: "2021-03-22T17:23:34",
    ending_date: "2021-03-28T17:23:34.000+00:00",
    activity_id: "10-10",
    status: "CONFIRMED",
    price: 10,
    email: "lamine.lang@outlook.com",
    stripe_payment_intent_id: null,
    stripe_payment_secret_id: null,
    first_name: "lamine",
    last_name: "lang",
  },
  {
    id: "15",
    profile_id: "642dfee1-57f4-4c4d-b0cc-39742ce9117b",
    starting_date: "2021-03-24T17:23:34",
    ending_date: "2021-03-28T17:23:34.000+00:00",
    activity_id: "10-10",
    status: "CONFIRMED",
    price: 10,
    email: "lamine.lang@outlook.com",
    stripe_payment_intent_id: null,
    stripe_payment_secret_id: null,
    first_name: "lamine",
    last_name: "lang",
  },
  {
    id: "15",
    profile_id: "642dfee1-57f4-4c4d-b0cc-39742ce9117b",
    starting_date: "2021-03-25T17:23:34",
    ending_date: "2021-03-28T17:23:34.000+00:00",
    activity_id: "10-10",
    status: "CONFIRMED",
    price: 10,
    email: "lamine.lang@outlook.com",
    stripe_payment_intent_id: null,
    stripe_payment_secret_id: null,
    first_name: "lamine",
    last_name: "lang",
  },
];

export default function Appointments() {
  const { token, profile } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);
  const [temp, setTemp] = useState([]);
  const [tabIndex, setTabIndex] = useState(1);

  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token]);

  const fetchAppointments = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `https://reb00t.uc.r.appspot.com/account/appointments?t=${token}`,
      config
    );

    const _data = await response.json();

    setData(filterByCurrWeek(groupAppointment(AppointmentData)));
    setTemp(groupAppointment(AppointmentData));
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
          {!data ? (
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
                  {fakedata.appointments.request.length > 0 ? (
                    <span className="requests-badge">
                      {fakedata.appointments.request.length}
                    </span>
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
                  <RequestList requestList={fakedata.appointments.request} />
                </>
              )}
            </Fade>
          )}
        </div>
      </div>
    </>
  );
}
