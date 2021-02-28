// libraries
import Head from 'next/head'
import Leftbar from '../components/Leftbar'

// components
import Navbar from '../components/Navbar'
import Settings from '../components/Settings'

export default function Setup() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />
      <div className="page-wrp">
        <Leftbar active="settings" />
        <div className="content-wrp">
          <Settings active="callsync" />
          <div className="call-sync__wrp">
            <div className="title">
              You can connect your calendar with Linq.
            </div>
            <div className="call-sync__calendar">
              <img src="/img/google-calendar.svg" alt="" />
              <button>Connect</button>
            </div>
            <span className="btm__txt">
              <b>Two-way sync</b> - Add Linq appointments to your outside calendar and add events from your
              outside calendar to Linq, blocking off your availability.
              <br />
              <br />
              Appointments made in Linq should be edited in LInq; The system will not recognize changes
              made in outside calendars. Events synced into Linq from outside calendars must be edited in the
              outside calendar ; they cannot be edited in Linq
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
