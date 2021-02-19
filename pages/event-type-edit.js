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
  const [descriptionCount, setDescriptionCount] = useState(0)
  const [needsCount, setNeedsCount] = useState(0)

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
            <div className="events-edit">
              <h2>Add a new event type</h2>
              <div className="events-edit__inner">
                <div className="events-edit__name">
                  <strong>Event Name*</strong>
                  <input type="text"/>
                </div>
                <div className="events-edit__col description">
                  <strong>Description*</strong>
                  <div className="events-edit__description__textarea">
                    <textarea maxlength="100" name="" id="" onChange={(e) => setDescriptionCount(e.target.value.length)} placeholder="100 Characters max">

                    </textarea>
                    <div className="count">{descriptionCount}/100</div>
                  </div>
                </div>
                <div className="events-edit__col need">
                  <strong>What people need to bring</strong>
                  <div className="events-edit__needs__textarea">
                    <textarea maxlength="100" name="" id="" onChange={(e) => setNeedsCount(e.target.value.length)} placeholder="100 Characters max">

                    </textarea>
                    <div className="count">{needsCount}/100</div>
                  </div>
                </div>
                <div className="events-edit__col radios">
                  <strong>Choose a duration</strong>
                  <div className="radios__predefined">
                    <label>
                      <input name="duration" type="radio"/>
                      <span>15 min</span>
                      <div className="checkmark"></div>
                    </label>
                    <label>
                      <input name="duration" type="radio"/>
                      <span>30 min</span>
                      <div className="checkmark"></div>
                    </label>
                    <label>
                      <input name="duration" type="radio"/>
                      <span>45 min</span>
                      <div className="checkmark"></div>
                    </label>
                    <label>
                      <input name="duration" type="radio"/>
                      <span>90 min</span>
                      <div className="checkmark"></div>
                    </label>
                  </div>
                  <strong>Choose custom duration (In minutes)</strong>
                  <label className="radios__custom">
                    <input name="duration" type="radio"/>
                    <div className="checkmark"></div>
                    <input type="text" placeholder="Example: 120 Min"/>
                  </label>
                </div>
                <div className="events-edit__col policy">
                  <strong>Cancelation policy*</strong>
                  <textarea name="" id=""></textarea>
                </div>
              </div>
              <div className="events-edit__btns">
                <button className="events-edit__btns-cancel">Cancel</button>
                <button className="events-edit__btns-save">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
