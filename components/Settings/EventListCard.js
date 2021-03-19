// libraries
import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fade from "react-reveal/Fade";

// context
import ProfileContext from "../../context/profile";

const EventListCard = ({ card, setTab }) => {
  // states
  const [open, setOpen] = useState(false);

  const { token } = useContext(ProfileContext);

  const deleteEventType = () => {
    async function del() {
      const response = await fetch("/api/settings/delete-event-type", {
        headers: new Headers({
          data: JSON.stringify({ token, id: card.id }),
        }),
      });

      return await response.json();
    }

    del()
      .then((res) => {
        // setLoading(false);
        console.log("Event type Delete", res);
        toast.success("Event Type Deleted");
      })
      .catch((err) => {
        // setLoading(false);
        console.log("Error Event type deleted", err);
        toast.error("An error has occurred");
      });
  };

  return (
    <div className="events-row__card">
      <Fade duration={1000}>
        <ToastContainer />
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
            <span onClick={() => setTab("eventtypeedit")}>
              <img src="/img/events-edit-icon.svg" alt="" />
              Edit
            </span>
            <span onClick={deleteEventType}>
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
