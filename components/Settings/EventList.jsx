// libraries
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import EventListCard from "./EventListCard";

// context
import ProfileContext from "../../context/profile";

const EventList = ({ events, setResponse, response }) => {
  const { token } = useContext(ProfileContext);

  // states
  const [loading, setLoading] = useState(false);

  const deleteEventType = (id) => {
    async function del() {
      const response = await fetch(
        `https://api.lynq.app/account/event-type/${id}?t=${token}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return await response;
    }

    del().then((res) => {
      if (res.status == 200) {
        console.log("Event type Delete", res);
        setResponse(!response);
      } else {
        console.log("Error Event type deleted", res);
        toast.error("An error has occurred");
      }
    });
  };

  return (
    <div className="events-wrp" style={{ position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src="/img/loading.gif" width={60} />
        </div>
      )}
      <ToastContainer />
      <div className="events-row">
        {events.map((card, index) => (
          <EventListCard
            card={card}
            key={index}
            deleteEventType={deleteEventType}
            setResponse={setResponse}
            response={response}
            loading={loading}
            setLoading={setLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;
