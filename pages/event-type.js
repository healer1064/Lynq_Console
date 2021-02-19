import Head from 'next/head'
import {useState} from 'react'

export default function Setup() {
  const eventsData = [
    {
      title: 'Meditation session for beginners',
      duration: 60,
      price: 50,
      isActive: true,
      showActions: false,
    },
    {
      title: 'Meditation session for beginners',
      duration: 60,
      price: 50,
      isActive: false,
      showActions: false,
    },
    {
      title: 'Meditation session for beginners',
      duration: 60,
      price: 50,
      isActive: false,
      showActions: false,
    },
    {
      title: 'Meditation session for beginners',
      duration: 60,
      price: 50,
      isActive: false,
      showActions: false,
    },
    {
      title: 'Meditation session for beginners',
      duration: 60,
      price: 50,
      isActive: false,
      showActions: false,
    },
    {
      title: 'Meditation session for beginners',
      duration: 60,
      price: 50,
      isActive: false,
      showActions: false,
    },
  ]
  const [events, setEvents] = useState(eventsData)

  const showActionsHandle = (index) => {
    console.log(index)
    let newArr = events.map((item, i) => {
      if(index == i) {
        return { ...item, showActions: !events[index].showActions}
      } else {
        return item
      }
    })
    setEvents(newArr)
  }

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
            <div className="option">Set Up</div>
            <div className="option active">Event Type</div>
            <div className="option">Call Sync</div>
          </div>
          <div className="settings-types__mobile">
            <select name="" id="">
              <option value="">Set Up</option>
              <option value="" selected>Event Type</option>
              <option value="">Call Sync</option>
            </select>
          </div>
          <div className="events-wrp">
            <div className="events-row">
              {events.map((card, index) => {
                return (
                  <div className="events-row__card">
                    <strong>{card.title}</strong>
                    <div className="btm">
                      <div>
                        <span className="duration">
                          {card.duration} min
                        </span>
                        <span>${card.price}</span>
                      </div>
                      <label className="events-row__toggle">
                        {card.isActive ? (
                          <input type="checkbox" checked/>
                        ) : (
                          <input type="checkbox"/>
                        )}
                        <div className="toggle-control"></div>
                      </label>
                    </div>
                    <div className="see__more" onClick={() => showActionsHandle(index)}>
                      <img src="/img/events-see-more.svg" alt=""/>
                    </div>
                    <div className={`actions__popup ${card.showActions ? 'show' : ''}`}>
                      <div className="actions__popup-wrp">
                        <div className="close" onClick={() => showActionsHandle(index)}>
                          <img src="/img/events-actions-close.svg" alt=""/>
                        </div>
                        <span>
                          <img src="/img/events-edit-icon.svg" alt=""/>
                          Edit
                        </span>
                        <span>
                          <img src="/img/events-delete-icon.svg" alt=""/>
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
