// libraries
import { useRouter } from "next/router";
import { useState } from "react";
import Fade from "react-reveal/Fade";

const EventListCard = ({ card, index, activeItemsHandler, setTab }) => {
  // states
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <div className="events-row__card">
      <Fade duration={1000}>
        <strong>{card.title}</strong>
        <div className="btm">
          <div>
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
              onClick={() => activeItemsHandler(index)}
            ></div>
          </label>
        </div>
        <div className="see__more" onClick={() => setOpen(!open)}>
          <img src="/img/events-see-more.svg" alt="" />
        </div>
        <div className={`actions__popup ${open ? "show" : ""}`}>
          <div className="actions__popup-wrp">
            <span onClick={() => setTab("eventtypeedit")}>
              <img src="/img/events-edit-icon.svg" alt="" />
              Edit
            </span>
            <span>
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
