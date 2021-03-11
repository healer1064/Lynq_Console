// libraries
import Head from "next/head";
import { useState } from "react";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import Settings from "../../components/Settings";
import EventTypeEdit from "../../components/EventTypeEdit/EventTypeEdit";

export default function Setup() {
  const eventsData = [
    {
      title: "Meditation session for beginners",
      duration: 60,
      price: 50,
      isActive: true,
      showActions: false,
    },
    {
      title: "Meditation session for beginners",
      duration: 60,
      price: 50,
      isActive: false,
      showActions: false,
    },
    {
      title: "Meditation session for beginners",
      duration: 60,
      price: 50,
      isActive: false,
      showActions: false,
    },
    {
      title: "Meditation session for beginners",
      duration: 60,
      price: 50,
      isActive: false,
      showActions: false,
    },
    {
      title: "Meditation session for beginners",
      duration: 60,
      price: 50,
      isActive: false,
      showActions: false,
    },
    {
      title: "Meditation session for beginners",
      duration: 60,
      price: 50,
      isActive: false,
      showActions: false,
    },
  ];
  const [events, setEvents] = useState(eventsData);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [needsCount, setNeedsCount] = useState(0);

  const showActionsHandle = (index) => {
    console.log(index);
    let newArr = events.map((item, i) => {
      if (index == i) {
        return { ...item, showActions: !events[index].showActions };
      } else {
        return item;
      }
    });
    setEvents(newArr);
  };

  return (
    <>
      <Head>
        <title>Settings</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className="page-wrp">
        <Leftbar active="settings" />
        <div className="content-wrp">
          <Settings active="eventtypeedit" />
          <EventTypeEdit
            needsCount={needsCount}
            setNeedsCount={setNeedsCount}
            descriptionCount={descriptionCount}
            setDescriptionCount={setDescriptionCount}
            showActionsHandle={showActionsHandle}
          />
        </div>
      </div>
    </>
  );
}
