// libraries
import Head from 'next/head'
import {useState} from 'react'

// components
import Navbar from '../components/Navbar'
import Leftbar from '../components/Leftbar'
import Settings from '../components/Settings'
import EventList from '../components/EventType/EventList'

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
    let newArr = events.map((item, i) => {
      if(index == i) {
        return { ...item, showActions: !events[index].showActions}
      } else {
        return item
      }
    })
    setEvents(newArr)
  }

  const activeItemsHandler = (index) => {
    let newActiveArr = events.map((item, i) => {
      if(index == i) {
        return { ...item, isActive: !events[index].isActive}
      } else {
        return item
      }
    })
    setEvents(newActiveArr)
  }

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
          <EventList events={events} showActionsHandle={showActionsHandle} activeItemsHandler={activeItemsHandler} />
        </div>
      </div>
    </>
  )
}
