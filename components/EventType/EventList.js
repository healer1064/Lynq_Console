// components
import EventListCard from "./EventListCard"

const EventList = ({showActionsHandle, activeItemsHandler, events}) => {
    return (
        <div className="events-wrp">
            <div className="events-row">
              {events.map((card, index) => {
                return (
                  <EventListCard card={card} key={index} index={index} showActionsHandle={showActionsHandle} activeItemsHandler={activeItemsHandler} />
                )
              })}
            </div>
          </div>
    )
}

export default EventList
