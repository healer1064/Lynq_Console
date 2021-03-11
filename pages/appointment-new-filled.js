// libraries
import Head from 'next/head'
import Leftbar from '../components/Leftbar'

// components
import Navbar from '../components/Navbar'

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
          <div className="appointment-new">
            <h2>Appointment</h2>
            <label>
              <strong>Event Type</strong>
              <select name="" id="">
                <option value="">Full Moon Meditation</option>
              </select>
            </label>
            <label>
              <strong>Duration (in minutes)</strong>
              <input type="text" placeholder="Example: 120 Min" value="60 min" />
            </label>
            <label className="small">
              <strong>Price</strong>
              <input type="text" value="$50" />
            </label>
            <label className="small">
              <strong>Day</strong>
              <select name="" id="">
                <option value="">Wednesday, February 22, 2021</option>
              </select>
            </label>
            <strong>Time</strong>
            <div className="appointment-new__time">
              <div className="top">
                <div className="arr prev">
                  <img src="/img/appointment-time-prev.svg" alt="" />
                </div>
                <div className="days">
                  <div className="day">
                    <b>Thursday</b>
                    <span>Feb 11</span>
                  </div>
                  <div className="day">
                    <b>Friday</b>
                    <span>Feb 12</span>
                  </div>
                  <div className="day">
                    <b>Saturday</b>
                    <span>Feb 13</span>
                  </div>
                  <div className="day">
                    <b>Sunday</b>
                    <span>Feb 14</span>
                  </div>
                  <div className="day">
                    <b>Monday</b>
                    <span>Feb 15</span>
                  </div>
                  <div className="day">
                    <b>Tuesday</b>
                    <span>Feb 16</span>
                  </div>
                  <div className="day">
                    <b>Wednesday</b>
                    <span>Feb 17</span>
                  </div>
                </div>
                <div className="arr next">
                  <img src="/img/appointment-time-next.svg" alt="" />
                </div>
              </div>
              <div className="btm">
                <div className="row">
                  <div className="col">
                    <button>
                      09:00 AM
                    </button>
                    <button>
                      10:00 AM
                    </button>
                    <button>
                      11:00 AM
                    </button>
                    <button>
                      12:00 PM
                    </button>
                    <button>
                      01:00 PM
                    </button>
                    <button>
                      02:00 PM
                    </button>
                    <button>
                      03:00 PM
                    </button>
                    <button>
                      04:00 PM
                    </button>
                  </div>
                  <div className="col">
                    <button>
                      09:00 AM
                    </button>
                  </div>
                  <div className="col"></div>
                  <div className="col"></div>
                  <div className="col"></div>
                  <div className="col"></div>
                  <div className="col"></div>
                </div>
              </div>
            </div>
            <div className="appointment-new__share">
              <div className="appointment-new__share__cnt">
                <h3>Share your Invitation</h3>
                <label>
                  <strong>Enter invitee emails</strong>
                  <input type="text" />
                  <span>you can also copy the link once  the appointment us published</span>
                </label>
              </div>
            </div>
            <div className="appointment-new__btns">
              <button className="appointment-new__btns__cancel">Cancel</button>
              <button className="appointment-new__btns__publish">PUBLISH</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
