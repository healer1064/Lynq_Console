// components
import EventListCard from "./EventListCard";

const EventList = ({ events, setTab }) => {
  return (
    <div className="events-wrp">
      <div className="events-row">
        {events.map((card, index) => (
          <EventListCard card={card} key={index} setTab={setTab} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
