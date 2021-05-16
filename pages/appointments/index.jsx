// libraries
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

// components
import AppointmentsTop from "../../components/Appointments/AppointmentsTop";
import AppointmentsList from "../../components/Appointments/AppointmentsList";
import PageLoading from "../../components/common/PageLoading";

// context
import ProfileContext from "../../context/profile";

// helpers
import { getCurrentWeek } from "../../utils/DateHelper";

// mockup
import mockUpData from "../../utils/data";

export default function Appointments() {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);
  const [temp, setTemp] = useState([]);

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

    // try {
    //   const response = await fetch(
    //     `https://api.lynq.app/account/appointments?t=${token}`,
    //     config
    //   );

    //   const _data = await response.json();
    //   setData(filterByCurrWeek(groupAppointment(_data)));
    //   setTemp(groupAppointment(_data));
    // } catch (err) {
    //   toast.error("Error, Failed to Fetch Appointment List!");
    //   setData([]);
    // }

    setData(filterByCurrWeek(groupAppointment(mockUpData.appointments)));
    setTemp(groupAppointment(mockUpData.appointments));
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
    _start = format(_start, "yyyy-MM-dd");
    _end = format(_end, "yyyy-MM-dd");

    let filter = temp.filter(
      (item) =>
        new Date(item.date).getTime() >= new Date(_start).getTime() &&
        new Date(item.date).getTime() <= new Date(_end).getTime()
    );

    setData(filter);
  };

  return (
    <>
      <Head>
        <title>Activities | Lynq</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="content-wrp wrp-1">
        {!data ? (
          <PageLoading />
        ) : (
          <>
            <br />
            <>
              <AppointmentsTop onWeekChange={onWeekChange} />
              <AppointmentsList appointmentList={data} />
            </>
          </>
        )}
      </div>
    </>
  );
}
