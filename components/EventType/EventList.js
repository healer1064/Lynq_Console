// components
import EventListCard from "./EventListCard";

const EventList = ({ activeItemsHandler, events, setTab }) => {
  return (
    <div className="events-wrp">
      <div className="events-row">
        {events.map((card, index) => {
          return (
            <EventListCard
              card={card}
              key={index}
              index={index}
              activeItemsHandler={activeItemsHandler}
              setTab={setTab}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EventList;
