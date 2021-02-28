// libraries
import Head from 'next/head'

// components
import Navbar from '../components/Navbar'
import AppointmentsTop from '../components/Appointments/AppointmentsTop'
import Leftbar from '../components/Leftbar'
import AppointmentsList from '../components/Appointments/AppointmentsList'

const appointments = [
  {
    day: "Thursday",
    date: "January 28, 2021",
    appointments: "0",
    status: "active"
  },
  {
    day: "Friday",
    date: "January 29, 2021",
    appointments: "2",
    status: "active"
  },
  {
    day: "Thursday",
    date: "January 28, 2021",
    appointments: "0",
    status: "active"
  },
  {
    day: "Friday",
    date: "January 29, 2021",
    appointments: "2",
    status: "active"
  },
  {
    day: "Thursday",
    date: "January 28, 2021",
    appointments: "0",
    status: "active"
  },
  {
    day: "Friday",
    date: "January 29, 2021",
    appointments: "2",
    status: "inactive"
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
          <AppointmentsTop />
          <AppointmentsList data={appointments} />
        </div>
      </div>
    </>
  )
}
