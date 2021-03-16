// libraries
import { useState } from "react";

// components
import EventList from "../EventType/EventList";

const SettingsEventType = ({ data, setTab }) => {
  // states
  const [events, setEvents] = useState(data);

  const activeItemsHandler = (index) => {
    let newActiveArr = events.map((item, i) => {
      if (index == i) {
        return { ...item, isActive: !events[index].isActive };
      } else {
        return item;
      }
    });
    setEvents(newActiveArr);
  };

  return (
    <EventList
      events={data}
      activeItemsHandler={activeItemsHandler}
      setTab={setTab}
    />
  );
};

export default SettingsEventType;
