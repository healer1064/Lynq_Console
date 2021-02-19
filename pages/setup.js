import Head from 'next/head'

export default function Setup() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <header className="header">
        <a href="#" className="header-logo">
          <img src="/img/linq-logo.svg" alt=""/>
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
            <a href="#">
              <img src="/img/nav-appointments.svg" alt=""/>
              <span>Appointments</span>
            </a>
            <a href="#">
              <img src="/img/nav-profile.svg" alt=""/>
              <span>Public Profile</span>
            </a>
            <div className="space"></div>
            <a href="#" className="active">
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
          <div className="settings-types">
            <div className="option active">Set Up</div>
            <div className="option">Event Type</div>
            <div className="option">Call Sync</div>
          </div>
          <div className="settings-types__mobile">
            <select name="" id="">
              <option value="">Set Up</option>
              <option value="">Event Type</option>
              <option value="">Call Sync</option>
            </select>
          </div>
          <div className="setup-wrp">
            <div className="setup-table">
              <div className="setup-table__title">
                Set your weekly hours
              </div>
              <div className="setup-table__row">
                <div className="setup-table__day">
                  <img src="/img/setup-check-unavailable.svg" alt=""/>
                  <span>sun</span>
                </div>
                <div className="setup-table__col">
                  <span className="unavailable">Unavailable</span>
                </div>
                <div className="setup-table__add">
                  <img src="/img/setup-add.svg" alt=""/>
                </div>
              </div>
              <div className="setup-table__row">
                <div className="setup-table__day">
                  <img src="/img/setup-check-available.svg" alt=""/>
                  <span>mon</span>
                </div>
                <div className="setup-table__col">
                  <div className="time__row">
                    <input type="time" value="09:00"/>
                    <div className="line"></div>
                    <input type="time" value="17:00"/>
                    <div className="trash">
                      <img src="/img/setup-trash.svg" alt=""/>
                    </div>
                  </div>
                  <div className="time__row">
                    <input type="time" value="09:00"/>
                    <div className="line"></div>
                    <input type="time" value="19:00"/>
                    <div className="trash">
                      <img src="/img/setup-trash.svg" alt=""/>
                    </div>
                  </div>
                </div>
                <div className="setup-table__add">
                  <img src="/img/setup-add.svg" alt=""/>
                </div>
              </div>
              <div className="setup-table__row">
                <div className="setup-table__day">
                  <img src="/img/setup-check-available.svg" alt=""/>
                  <span>tue</span>
                </div>
                <div className="setup-table__col">
                  <div className="time__row">
                    <input type="time" value="09:00"/>
                    <div className="line"></div>
                    <input type="time" value="17:00"/>
                    <div className="trash">
                      <img src="/img/setup-trash.svg" alt=""/>
                    </div>
                  </div>
                </div>
                <div className="setup-table__add">
                  <img src="/img/setup-add.svg" alt=""/>
                </div>
              </div>
              <div className="setup-table__row">
                <div className="setup-table__day">
                  <img src="/img/setup-check-available.svg" alt=""/>
                  <span>wed</span>
                </div>
                <div className="setup-table__col">
                  <div className="time__row">
                    <input type="time" value="09:00"/>
                    <div className="line"></div>
                    <input type="time" value="17:00"/>
                    <div className="trash">
                      <img src="/img/setup-trash.svg" alt=""/>
                    </div>
                  </div>
                </div>
                <div className="setup-table__add">
                  <img src="/img/setup-add.svg" alt=""/>
                </div>
              </div>
              <div className="setup-table__row">
                <div className="setup-table__day">
                  <img src="/img/setup-check-available.svg" alt=""/>
                  <span>thu</span>
                </div>
                <div className="setup-table__col">
                  <div className="time__row">
                    <input type="time" value="09:00"/>
                    <div className="line"></div>
                    <input type="time" value="17:00"/>
                    <div className="trash">
                      <img src="/img/setup-trash.svg" alt=""/>
                    </div>
                  </div>
                </div>
                <div className="setup-table__add">
                  <img src="/img/setup-add.svg" alt=""/>
                </div>
              </div>
              <div className="setup-table__row">
                <div className="setup-table__day">
                  <img src="/img/setup-check-available.svg" alt=""/>
                  <span>fri</span>
                </div>
                <div className="setup-table__col">
                  <div className="time__row">
                    <input type="time" value="09:00"/>
                    <div className="line"></div>
                    <input type="time" value="17:00"/>
                    <div className="trash">
                      <img src="/img/setup-trash.svg" alt=""/>
                    </div>
                  </div>
                </div>
                <div className="setup-table__add">
                  <img src="/img/setup-add.svg" alt=""/>
                </div>
              </div>
              <div className="setup-table__row">
                <div className="setup-table__day">
                  <img src="/img/setup-check-unavailable.svg" alt=""/>
                  <span>sat</span>
                </div>
                <div className="setup-table__col">
                  <span className="unavailable">Unavailable</span>
                </div>
                <div className="setup-table__add">
                  <img src="/img/setup-add.svg" alt=""/>
                </div>
              </div>
            </div>
            <div className="setup-notifications">
              <div className="setup-notifications__card">
                <div className="title">
                  <img src="/img/notifications-buffers.svg" alt=""/>
                  <strong>Buffers</strong>
                </div>
                <span>5 min before event</span>
              </div>
              <div className="setup-notifications__card">
                <div className="title">
                  <img src="/img/notifications-reminders.svg" alt=""/>
                  <strong>Reminders</strong>
                </div>
                <span>6 hour before event</span>
                <span>1 hour before event</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
