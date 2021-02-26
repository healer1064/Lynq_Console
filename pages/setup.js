// libraries
import Head from 'next/head'

// components
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import SetupNotifications from '../components/Setup/SetupNotifications'
import Settings from '../components/Settings'
import SetupTable from '../components/Setup/SetupTable'

export default function Setup() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />
      <div className="page-wrp">
        <Leftbar />
        <div className="content-wrp">
          <Settings />
          <div className="setup-wrp">
            <SetupTable />
            <SetupNotifications />
          </div>
        </div>
      </div>
    </>
  )
}
