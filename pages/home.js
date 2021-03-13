import React from "react";
import Head from "next/head";

const home = () => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header className="header">
        <a href="#" className="header-logo">
          <img src="/img/linq-logo.png" alt="" />
        </a>
        <div className="burger-menu">
          <img src="/img/burger-menu.svg" alt="" />
        </div>
      </header>
      <div className="page-wrp">
        <div className="side-nav">
          <nav>
            <a href="#">
              <img src="/img/nav-home.svg" alt="" />
              <span>Home</span>
            </a>
            <a href="#" className="active">
              <img src="/img/nav-appointments.svg" alt="" />
              <span>Appointments</span>
            </a>
            <a href="#">
              <img src="/img/nav-profile.svg" alt="" />
              <span>Public Profile</span>
            </a>
            <div className="space"></div>
            <a href="#">
              <img src="/img/nav-settings.svg" alt="" />
              <span>Settings</span>
            </a>
            <a href="#">
              <img src="/img/nav-clients.svg" alt="" />
              <span>Clients</span>
            </a>
            <a href="#">
              <img src="/img/nav-payments.svg" alt="" />
              <span>Payment</span>
            </a>
            <a href="#">
              <img src="/img/nav-contact.svg" alt="" />
              <span>Contact</span>
            </a>
          </nav>
          <div className="side-nav__profile">
            <div className="side-nav__profile-pic">
              <img src="/img/profile-pic.png" alt="" />
            </div>
            <span>John doe</span>
            <img src="/img/nav-profile-arr.svg" alt="" />
          </div>
        </div>
        <div className="home-wrp">
          <div className="notifications__col">
            <div className="confirm__email">
              <span>
                Please confirm your email address. A confirmation email was sent
                to IlhamdanShalima@gmail.com
              </span>
              <a href="#">Resend Confirmation</a>
            </div>
            <div className="session">
              <span>Current live session | 08:00 AM - 09:00 AM</span>
              <a href="#" className="access__live">
                ACCESS THE LIVE
              </a>
            </div>
            <div className="session">
              <span>
                Click here to start your next session | 09:00 AM - 10:00 AM
              </span>
              <a href="#" className="start__live">
                START THE LIVE
              </a>
            </div>
          </div>
          <div className="home-cnt">
            <div className="home-cnt__date">Wednesday, February 10, 2021</div>
            <h2>Today’s Session</h2>
            <div className="appointments-col__event blue">
              <div className="title">Meditation 30 Min</div>
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
            <div className="appointments-col__event red">
              <div className="title">Event in your google calendar</div>
              <div className="det">
                Wednesday, 24, 2021
                <div className="line"></div>
                <b>10:00 AM - 11:00 AM</b>
                <div className="line"></div>
                <b>60 Min</b>
              </div>
            </div>
            <div className="appointments-col__event blue">
              <div className="title">Meditation 30 Min</div>
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
            <div className="home-stats">
              <div className="home-stats__switch">
                <div className="option">Today</div>
                <div className="option">Weekly</div>
                <div className="option active">Monthly</div>
                <div className="option">Yearly</div>
              </div>
              <select name="" id="" className="home-stats__select">
                <option value="">Today</option>
                <option value="">Weekly</option>
                <option value="" selected>
                  Monthly
                </option>
                <option value="">Yearly</option>
              </select>
              <div className="home-stats__row">
                <div className="card">
                  <div className="icon">
                    <img src="/img/home-stats-revenue.svg" alt="" />
                  </div>
                  <div className="title">Revenue</div>
                  <div className="num">$4,350</div>
                </div>
                <div className="card">
                  <div className="icon">
                    <img src="/img/home-stats-session.svg" alt="" />
                  </div>
                  <div className="title">Session</div>
                  <div className="num">33</div>
                </div>
                <div className="card">
                  <div className="icon">
                    <img src="/img/home-stats-request.svg" alt="" />
                  </div>
                  <div className="title">Request</div>
                  <div className="num">36</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default home;
