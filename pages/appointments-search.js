// libraries
import Head from 'next/head'

// components
import Navbar from '../components/Navbar'
import Leftbar from '../components/Leftbar'
import NewAppointmentButton from '../components/Appointments/NewAppointmentButton'
import AppointmentsSearchDate from '../components/AppointmentsSearch/AppointmentsSearchDate'
import AppointmentsSearchList from '../components/AppointmentsSearch/AppointmentsSearchList'

const appointments = [
  {
    title: "Event in your google calendar",
    date: "Wednesday, 24, 2021",
    time: "10:00 AM - 11:00 AM",
    duration: "60 Min",
    client_name: "",
    client_email: "",
    color: "red"
  },
  {
    title: "Meditation 30 Min",
    date: "Wednesday, 24, 2021",
    time: "10:00 AM - 11:00 AM",
    duration: "60 Min",
    client_name: "John Regiani",
    client_email: "John.regiani@gmail.com",
    color: "blue"
  },
]

export default function Setup() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />
      <div className="page-wrp">
        <Leftbar active="appointments" />
        <div className="content-wrp">
          <div className="appointments-top">
            <NewAppointmentButton />
          </div>
          <div className="appointments-search__col">
            <AppointmentsSearchDate />
            <AppointmentsSearchList data={appointments} />
          </div>
        </div>
      </div>
    </>
  )
}
