// libraries
import Head from 'next/head'
import { useState } from 'react'

// components
import Navbar from '../components/Navbar'
import Leftbar from '../components/Leftbar'
import NewAppointmentModal from '../components/NewAppointment/NewAppointmentModal'


export default function NewAppointment() {

    const [modal, setModal] = useState(false)

    return (
        <>
            <Head>
                <title>New Appointment</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
            </Head>
            <Navbar />
            <div className="page-wrp">
                <Leftbar />
                <div className="content-wrp">
                    <div className="new-appointment" >
                        <h3>Support</h3>
                        <p>At Linq, we are commited to providing you with a great and reliable experience.</p>
                        <div>
                            <h3>Type your request</h3>
                            <textarea></textarea>
                        </div>
                        <button onClick={() => setModal(true)} >Send Request</button>
                    </div>
                </div>
            </div>
            {modal && <NewAppointmentModal setModal={setModal} />}
        </>
    )
}
