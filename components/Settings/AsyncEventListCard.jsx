// libraries
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Fade from "react-reveal/Fade";
import { IoCopyOutline } from "react-icons/io5";

// context
import ProfileContext from "../../context/profile";

const AsyncEventListCard = ({
  card,
  deleteEventType,
  setResponse,
  response,
  setLoading,
}) => {
  // states
  const [open, setOpen] = useState(false);

  // useContext
  const { token } = useContext(ProfileContext);

  // router
  const router = useRouter();

  // const changeEventTypeStatus = (card) => {
  // const _reqData = {
  //   id: card.id,
  //   name: card.name,
  //   teacherId: card.teacherId,
  //   description: card.description,
  //   duration: card.duration,
  //   price: card.price,
  //   isActive: !card.isActive,
  //   cancellation_policy: card.cancellation_policy,
  //   material_needed: card.material_needed,
  // };

  // async function change() {
  //   setLoading(true);
  //   const response = await fetch(
  //     `https://api.lynq.app/account/event-type/${card.id}/toggle?t=${token}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(_reqData),
  //     }
  //   );

  //   return await response;
  // }

  // change().then((res) => {
  //   setLoading(false);
  //   if (res.status == 200) {
  //     setResponse(!response);
  //     console.log("Event type toggle", res);
  //   } else {
  //     console.log("Error Event type toggle", res);
  //     toast.error("An error has occurred");
  //     setLoading(false);
  //   }
  // });
  //   console.log("toggle");
  // };

  const changeEventTypeStatus = (card) => {
    setOpen(false);
    setLoading(true);
    const _reqData = {
      name: card.name,
      client_needs: card.clientNeeds,
      description: card.description,
      packages: card.packages,
      enabled: card.enabled ? !card.enabled : true,
    };

    async function add() {
      const response = await fetch(
        `https://api.lynq.app/async/type/${card.id}?t=${token}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(_reqData),
        }
      );

      return await response;
    }

    add().then((res) => {
      setLoading(false);
      if (res.status == 200) {
        console.log("Event type added", res);
        setResponse(!response);
      } else {
        console.log("Error Event type added", res);
        toast.error("An error has occurred");
      }
    });
  };

  const duplicateEventType = () => {
    setOpen(false);
    setLoading(true);
    const _reqData = {
      name: `Copy of ${card.name}`,
      client_needs: card.clientNeeds,
      description: card.description,
      packages: card.packages,
    };

    async function add() {
      const response = await fetch(
        `https://api.lynq.app/async/type?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(_reqData),
        }
      );

      return await response;
    }

    add().then((res) => {
      setLoading(false);
      if (res.status == 200) {
        console.log("Event type added", res);
        setResponse(!response);
      } else {
        console.log("Error Event type added", res);
        toast.error("An error has occurred");
      }
    });
  };

  return (
    <div className="events-row__card">
      <Fade duration={1000}>
        <strong>{card.name}</strong>
        <div className="btm">
          <div>
            {card.packages.map((pkg, index) => {
              return (
                <span key={index} className="duration">
                  {pkg.name}: {pkg.delivery} days for ${pkg.displayPrice}
                </span>
              );
            })}
            {/* <span className="duration">{card.description}</span> */}
          </div>
          <label className="events-row__toggle">
            <input
              type="checkbox"
              checked={card.enabled}
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
                router.push(`/event-types/async/${card.id}`);
              }}
            >
              <img src="/img/events-edit-icon.svg" alt="" />
              Edit
            </span>
            <span onClick={duplicateEventType}>
              <IoCopyOutline size={15} style={{ marginRight: "8px" }} />
              Duplicate
            </span>
            <span
              onClick={() => {
                setOpen(false);
                deleteEventType(card.id);
              }}
            >
              <img src="/img/events-delete-icon.svg" alt="" />
              Delete
            </span>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default AsyncEventListCard;
