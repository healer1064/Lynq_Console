// libraries
import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fade from "react-reveal/Fade";

// context
import ProfileContext from "../../context/profile";

const EventListCard = ({
  card,
  setTab,
  deleteEventType,
  setResponse,
  response,
  setLoading,
}) => {
  // states
  const [open, setOpen] = useState(false);

  // useContext
  const { setEventType, token } = useContext(ProfileContext);

  const changeEventTypeStatus = (card) => {
    const _reqData = {
      id: card.id,
      name: card.name,
      teacherId: card.teacherId,
      description: card.description,
      duration: card.duration,
      price: card.price,
      isActive: !card.isActive,
      cancellation_policy: card.cancellation_policy,
      material_needed: card.material_needed,
    };

    async function change() {
      setLoading(true);
      const response = await fetch(
<<<<<<< Updated upstream
        `https://reb00t.uc.r.appspot.com/account/event-type/${id}/toggleActive?t=${token}`,
=======
        `http://reb00t.uc.r.appspot.com/account/event-type/${card.id}/toggle?t=${token}`,
>>>>>>> Stashed changes
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(_reqData),
        }
      );

      return await response.json();
    }

    change()
      .then((res) => {
        setResponse(!response);
        console.log("Event type toggle", res);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error Event type toggle", err);
        toast.error("An error has occurred");
        setLoading(false);
      });
  };

  return (
    <div className="events-row__card">
      <ToastContainer />
      <Fade duration={1000}>
        <strong>{card.name}</strong>
        <div className="btm">
          <div>
            <span className="duration">{card.description}</span>
            <span className="duration">{card.duration} min</span>
            <span>${card.price}</span>
          </div>
          <label className="events-row__toggle">
            <input
              type="checkbox"
              checked={card.isActive}
              onChange={() => changeEventTypeStatus(card)}
            />
            <div className="toggle-control" />
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
