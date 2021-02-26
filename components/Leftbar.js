const Leftbar = () => {
    return (
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
    )
}

export default Leftbar
