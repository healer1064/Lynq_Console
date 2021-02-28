// libraries
import Head from 'next/head'
// import { useState } from 'react'
import ClientsTable from '../components/Clients/ClientsTable'

// components
import NewClientButton from '../components/Clients/NewClientButton'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'

export default function Setup() {
  // states
  // const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />
      <div className="page-wrp">
        <Leftbar active="clients" />
        <div className="content-wrp">
          <div className="clients-wrp">
            <div className="clients-wrp__top">
              <NewClientButton />
              <input type="text" placeholder="Search" className="clients-wrp__search" />
            </div>
            <ClientsTable />
          </div>
        </div>
      </div>
    </>
  )
}
