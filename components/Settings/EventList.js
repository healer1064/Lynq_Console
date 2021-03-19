// libraries
import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

// components
import EventListCard from "./EventListCard";

// context
import ProfileContext from "../../context/profile";

const EventList = ({ events, setTab, setResponse, response }) => {
  const { token } = useContext(ProfileContext);

  const deleteEventType = (id) => {
    async function del() {
      const response = await fetch("/api/settings/delete-event-type", {
        headers: new Headers({
          data: JSON.stringify({ token, id: id }),
        }),
      });

      return await response.json();
    }

    del()
      .then((res) => {
        console.log("Event type Delete", res);
        setResponse(!response);
      })
      .catch((err) => {
        console.log("Error Event type deleted", err);
        toast.error("An error has occurred");
      });
  };

  return (
    <div className="events-wrp">
      <ToastContainer />
      <div className="events-row">
        {events.map((card, index) => (
          <EventListCard
            card={card}
            key={index}
            setTab={setTab}
            deleteEventType={deleteEventType}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;
