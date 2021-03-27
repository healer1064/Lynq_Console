// libraries
import Head from "next/head";
import { useRouter } from "next/router";
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
import InvitationsList from "../../components/Appointments/Invitations/InvitationsList";

const fakeInvitations = [
  {
    id: "19",
    profile_id: "642dfee1-57f4-4c4d-b0cc-39742ce9117b",
    starting_date: "2021-05-21T17:23:34",
    ending_date: "2021-03-21T17:23:34",
    activity_id: "10-10",
    summary: "Booking with Client (Yoga 40 mins)",
    status: "CANCELLED",
    display_fees: null,
    display_price: null,
    email: "lamine.lang@outlook.com",
    stripe_payment_intent_id: null,
    stripe_payment_secret_id: null,
    first_name: "lamine",
    last_name: "lang",
  },
  {
    id: "14",
    profile_id: "642dfee1-57f4-4c4d-b0cc-39742ce9117b",
    starting_date: "2021-03-21T17:23:34",
    ending_date: "2021-03-21T17:23:34",
    activity_id: "10-10",
    summary: "Booking with Client (Yoga 40 mins)",
    status: "CONFIRMED",
    display_fees: null,
    display_price: null,
    email: "lamine.lang@outlook.com",
    stripe_payment_intent_id: null,
    stripe_payment_secret_id: null,
    first_name: "lamine",
    last_name: "lang",
  },
  {
    id: "20",
    profile_id: "642dfee1-57f4-4c4d-b0cc-39742ce9117b",
    starting_date: "2021-04-21T17:23:34",
    ending_date: "2021-03-21T17:23:34",
    activity_id: "10-10",
    summary: "Booking with Client (Yoga 40 mins)",
    status: "CANCELLED",
    display_fees: null,
    display_price: null,
    email: "lamine.lang@outlook.com",
    stripe_payment_intent_id: null,
    stripe_payment_secret_id: null,
    first_name: "lamine",
    last_name: "lang",
  },
  {
    id: "10",
    profile_id: "642dfee1-57f4-4c4d-b0cc-39742ce9117b",
    starting_date: "2021-03-21T17:23:34",
    ending_date: "2021-03-21T17:23:34",
    activity_id: "10-10",
    summary: "Booking with Client (Yoga 40 mins)",
    status: "CONFIRMED",
    display_fees: null,
    display_price: null,
    email: "lamine.lang@outlook.com",
    stripe_payment_intent_id: null,
    stripe_payment_secret_id: null,
    first_name: "lamine",
    last_name: "lang",
  },
  {
    id: "12",
    profile_id: "642dfee1-57f4-4c4d-b0cc-39742ce9117b",
    starting_date: "2021-03-21T17:23:34",
    ending_date: "2021-03-21T17:23:34",
    activity_id: "10-10",
    summary: "Booking with Client (Yoga 40 mins)",
    status: "CONFIRMED",
    display_fees: null,
    display_price: null,
    email: "lamine.lang@outlook.com",
    stripe_payment_intent_id: null,
    stripe_payment_secret_id: null,
    first_name: "lamine",
    last_name: "lang",
  },
  {
    id: "18",
    profile_id: "642dfee1-57f4-4c4d-b0cc-39742ce9117b",
    starting_date: "2021-06-21T17:23:34",
    ending_date: "2021-03-21T17:23:34",
    activity_id: "10-10",
    summary: "Booking with Client (Yoga 40 mins)",
    status: "CANCELLED",
    display_fees: null,
    display_price: null,
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
    ending_date: "2021-03-21T17:23:34",
    activity_id: "10-10",
    summary: "Booking with Client (Yoga 40 mins)",
    status: "CONFIRMED",
    display_fees: null,
    display_price: null,
    email: "lamine.lang@outlook.com",
    stripe_payment_intent_id: null,
    stripe_payment_secret_id: null,
    first_name: "lamine",
    last_name: "lang",
  },
  {
    id: "13",
    profile_id: "642dfee1-57f4-4c4d-b0cc-39742ce9117b",
    starting_date: "2021-03-21T17:23:34",
    ending_date: "2021-03-21T17:23:34",
    activity_id: "10-10",
    summary: "Booking with Client (Yoga 40 mins)",
    status: "CONFIRMED",
    display_fees: null,
    display_price: null,
    email: "lamine.lang@outlook.com",
    stripe_payment_intent_id: null,
    stripe_payment_secret_id: null,
    first_name: "lamine",
    last_name: "lang",
  },
  {
    id: "11",
    profile_id: "642dfee1-57f4-4c4d-b0cc-39742ce9117b",
    starting_date: "2021-03-21T17:23:34",
    ending_date: "2021-03-21T17:23:34",
    activity_id: "10-10",
    summary: "Booking with Client (Yoga 40 mins)",
    status: "CONFIRMED",
    display_fees: null,
    display_price: null,
    email: "lamine.lang@outlook.com",
    stripe_payment_intent_id: null,
    stripe_payment_secret_id: null,
    first_name: "lamine",
    last_name: "lang",
  },
];

export default function Appointments() {
  // router
  const router = useRouter();

  // context
  const { token } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);
  const [apt, setApt] = useState(null);
  const [requests, setRequests] = useState(null);
  const [temp, setTemp] = useState([]);
  const [tabIndex, setTabIndex] = useState(1);

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
      `https://api.lynq.app/account/appointments/requests?t=${token}`,
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
                <div
                  onClick={() => setTabIndex(3)}
                  className={`option ${tabIndex == 3 && "active"}`}
                  style={{ position: "relative" }}
                >
                  Invitations (Waiting for payment)
                </div>
              </div>
              <div className="settings-types__mobile">
                <select
                  onChange={(e) => setTabIndex(e.target.value)}
                  value={tabIndex}
                >
                  <option value={1}>Scheduled</option>
                  <option value={2}>Requests</option>
                  <option value={3}>Invitations (Waiting for payment)</option>
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
              ) : tabIndex == 2 ? (
                <>
                  <RequestList
                    requestList={requests}
                    apt={apt}
                    setTabIndex={setTabIndex}
                  />
                </>
              ) : (
                <InvitationsList invitations={fakeInvitations} />
              )}
            </Fade>
          )}
        </div>
      </div>
    </>
  );
}
