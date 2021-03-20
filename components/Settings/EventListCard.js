// libraries
import { useState, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import Fade from "react-reveal/Fade";

// context
import ProfileContext from "../../context/profile";

const EventListCard = ({ card, setTab, deleteEventType }) => {
  // states
  const [open, setOpen] = useState(false);

  // useContext
  const { setEventType, eventType } = useContext(ProfileContext);

  return (
    <div className="events-row__card">
      <Fade duration={1000}>
        <strong>{card.name}</strong>
        <div className="btm">
          <div>
            <span className="duration">{card.description}</span>
            <span className="duration">{card.duration} min</span>
            <span>${card.price}</span>
          </div>
          <label className="events-row__toggle">
            {card.isActive ? (
              <input type="checkbox" />
            ) : (
              <input type="checkbox" />
            )}
            <div
              className="toggle-control"
              onClick={() => console.log("on")}
            ></div>
          </label>
        </div>
        <div className="see__more" onClick={() => setOpen(!open)}>
          <img src="/img/events-see-more.svg" alt="" />
        </div>
        <div className={`actions__popup ${open ? "show" : ""}`}>
          <div className="actions__popup-wrp">
            <span
              onClick={() => {
                setEventType(card);
                setTab("eventtypeedit");
              }}
            >
              <img src="/img/events-edit-icon.svg" alt="" />
              Edit
            </span>
            <span onClick={() => deleteEventType(card.id)}>
              <img src="/img/events-delete-icon.svg" alt="" />
              Delete
            </span>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default EventListCard;
