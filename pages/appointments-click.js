import Head from 'next/head'

export default function Setup() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <header className="header">
        <a href="#" className="header-logo">
          <img src="/img/linq-logo.png" alt=""/>
        </a>
        <div className="burger-menu">
          <img src="/img/burger-menu.svg" alt=""/>
        </div>
      </header>
      <div className="page-wrp">
        <div className="side-nav">
          <nav>
            <a href="#">
              <img src="/img/nav-home.svg" alt=""/>
              <span>Home</span>
            </a>
            <a href="#" className="active">
              <img src="/img/nav-appointments.svg" alt=""/>
              <span>Appointments</span>
            </a>
            <a href="#">
              <img src="/img/nav-profile.svg" alt=""/>
              <span>Public Profile</span>
            </a>
            <div className="space"></div>
            <a href="#">
              <img src="/img/nav-settings.svg" alt=""/>
              <span>Settings</span>
            </a>
            <a href="#">
              <img src="/img/nav-clients.svg" alt=""/>
              <span>Clients</span>
            </a>
            <a href="#">
              <img src="/img/nav-payments.svg" alt=""/>
              <span>Payment</span>
            </a>
            <a href="#">
              <img src="/img/nav-contact.svg" alt=""/>
              <span>Contact</span>
            </a>
          </nav>
          <div className="side-nav__profile">
            <div className="side-nav__profile-pic">
              <img src="/img/profile-pic.png" alt=""/>
            </div>
            <span>John doe</span>
            <img src="/img/nav-profile-arr.svg" alt=""/>
          </div>
        </div>
        <div className="content-wrp">
          <div className="appointments-top">
            <div className="appointments-top__btn">
              <img src="/img/appointments-btn-plus.svg" alt=""/>
              <span>New Appointment</span>
            </div>
            <div className="appointments-top__calendar">
              <div className="prev">
                <img src="/img/appointments-calendar-prev.svg" alt=""/>
              </div>
              <div className="dates">
                <img src="/img/appointments-calendar-icon.svg" alt=""/>
                <span>21-28 February 2021</span>
              </div>
              <div className="next">
                <img src="/img/appointments-calendar-next.svg" alt=""/>
              </div>
            </div>
          </div>
          <div className="appointments-col">
            <div className="appointments-col__card__wrp active">
              <div className="appointments-col__card">
                <div className="det">
                  Thursday
                  <div className="line"></div>
                  January 28, 2021
                  <div className="line"></div>
                  <b>0 appointment</b>
                </div>
                <div className="arrow">
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12L0.0717964 0L13.9282 0L7 12Z" fill="#7E88F4"/>
                  </svg>
                </div>
              </div>
              <div className="appointments-col__event red">
                <div className="title">
                  Event in your google calendar
                </div>
                <div className="det">
                  Wednesday, 24, 2021
                  <div className="line"></div>
                  <b>10:00 AM - 11:00 AM</b>
                  <div className="line"></div>
                  <b>60 Min</b>
                </div>
              </div>
              <div className="appointments-col__event blue">
                <div className="title">
                  Meditation 30 Min
                </div>
                <div className="det">
                  Wednesday, 24, 2021
                  <div className="line"></div>
                  <b>10:00 AM - 11:00 AM</b>
                  <div className="line"></div>
                  <b>60 Min</b>
                </div>
                <div className="client">
                  Client: John Regiani
                  <div className="line"></div>
                  John.regiani@gmail.com
                </div>
              </div>
            </div>
            <div className="appointments-col__card__wrp">
              <div className="appointments-col__card">
                <div className="det">
                  Friday
                  <div className="line"></div>
                  January 29, 2021
                  <div className="line"></div>
                  <b>2 appointments</b>
                </div>
                <div className="arrow">
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12L0.0717964 0L13.9282 0L7 12Z" fill="#7E88F4"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="appointments-col__card__wrp">
              <div className="appointments-col__card">
                <div className="det">
                  Thursday
                  <div className="line"></div>
                  January 28, 2021
                  <div className="line"></div>
                  <b>0 appointment</b>
                </div>
                <div className="arrow">
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12L0.0717964 0L13.9282 0L7 12Z" fill="#7E88F4"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="appointments-col__card__wrp">
              <div className="appointments-col__card">
                <div className="det">
                  Friday
                  <div className="line"></div>
                  January 29, 2021
                  <div className="line"></div>
                  <b>2 appointments</b>
                </div>
                <div className="arrow">
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12L0.0717964 0L13.9282 0L7 12Z" fill="#7E88F4"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="appointments-col__card__wrp">
              <div className="appointments-col__card">
                <div className="det">
                  Thursday
                  <div className="line"></div>
                  January 28, 2021
                  <div className="line"></div>
                  <b>0 appointment</b>
                </div>
                <div className="arrow">
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12L0.0717964 0L13.9282 0L7 12Z" fill="#7E88F4"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="appointments-col__card__wrp inactive">
              <div className="appointments-col__card">
                <div className="det">
                  Friday
                  <div className="line"></div>
                  January 29, 2021
                  <div className="line"></div>
                  <b>2 appointments</b>
                </div>
                <div className="arrow">
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12L0.0717964 0L13.9282 0L7 12Z" fill="#7E88F4"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
