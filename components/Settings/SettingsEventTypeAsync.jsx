// libraries
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

// context
import ProfileContext from "../../context/profile";

// components
import Loading from "../common/Loading";

const SettingsEventTypeAsync = () => {
  // states
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [infoCount, setInfoCount] = useState(0);
  const [eventName, setEventName] = useState("");
  const [desc, setDesc] = useState("");
  const [standardDelivery, setStandardDelivery] = useState(7);
  const [standardPrice, setStandardPrice] = useState();
  const [expressDelivery, setExpressDelivery] = useState();
  const [expressPrice, setExpressPrice] = useState();
  const [info, setInfo] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // cancel policy states
  const [isAddMore, setIsAddMore] = useState(false);
  const [hourOne, setHourOne] = useState("24");
  const [hourTwo, setHourTwo] = useState("6");
  const [per, setPer] = useState("50");

  // context
  const { token } = useContext(ProfileContext);

  // router
  const router = useRouter();

  //   const handleSave = () => {
  //     if (eventName !== "" && desc !== "" && duration !== "" && price !== "") {
  //       if (duration === "custom" && customDur === "") {
  //         setError(true);
  //       } else {
  //         setLoading(true);
  //         setError(false);
  //         addEventType();
  //       }
  //     } else {
  //       setError(true);
  //     }
  //   };

  //   const addEventType = () => {
  //     const _reqData = {
  //       id: uuidv4(),
  //       name: eventName,
  //       teacherId: "string",
  //       description: desc,
  //       duration: duration === "custom" ? customDur : duration,
  //       price,
  //       material_needed: info,
  //     };

  //     async function add() {
  //       const response = await fetch(
  //         `https://api.lynq.app/account/event-type?t=${token}`,
  //         {
  //           method: "POST",
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(_reqData),
  //         }
  //       );

  //       return await response;
  //     }

  //     add().then((res) => {
  //       setLoading(false);
  //       if (res.status == 200) {
  //         console.log("Event type added", res);
  //         setTab("eventtype");
  //       } else {
  //         console.log("Error Event type added", res);
  //         toast.error("An error has occurred");
  //       }
  //     });
  //   };

  return (
    <div className="events-wrp">
      <ToastContainer />
      <div className="events-edit">
        <h2>Add Event Type</h2>
        <div className="events-edit__inner">
          <div className="events-edit__name">
            <strong>Event Type</strong>
            <span
              style={{
                marginTop: "-10px",
                color: "#777",
                fontStyle: "italic",
              }}
            >
              Asynchronous
            </span>
          </div>
          <div className="events-edit__name">
            <strong>Event Name*</strong>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="events-edit__col description">
            <strong>Description*</strong>
            <div className="events-edit__description__textarea">
              <textarea
                maxLength="300"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                  setDescriptionCount(e.target.value.length);
                }}
                placeholder="300 Characters max"
              ></textarea>
              <div className="count">{descriptionCount}/300</div>
            </div>
          </div>
          <div className="events-edit__col need">
            <strong>
              Information the client needs to provide in his/her video
            </strong>
            <div className="events-edit__needs__textarea">
              <textarea
                maxLength="300"
                value={info}
                onChange={(e) => {
                  setInfoCount(e.target.value.length);
                  setInfo(e.target.value);
                }}
                placeholder="300 Characters max"
              ></textarea>
              <div className="count">{infoCount}/300</div>
            </div>
          </div>
          <div className="event-type-async-price-time">
            <div className="events-edit__price">
              <strong>Standard Delivery Time (in days)</strong>
              <input
                style={{ paddingLeft: "16px" }}
                type="number"
                min={1}
                value={standardDelivery}
                onChange={(e) => setStandardDelivery(e.target.value)}
                placeholder="Enter standard delivery time in days"
              />
            </div>
            <div className="events-edit__price">
              <strong>Standard Price</strong>
              <input
                type="number"
                min={1}
                value={standardPrice}
                onChange={(e) => setStandardPrice(e.target.value)}
              />
              <img src="/img/dollar.svg" alt="dollar" />
            </div>
          </div>
          <div className="event-type-async-price-time">
            <div className="events-edit__price">
              <strong>Express Delivery Time (in days)</strong>
              <input
                type="number"
                style={{ paddingLeft: "16px" }}
                min={1}
                value={expressDelivery}
                onChange={(e) => setExpressDelivery(e.target.value)}
                placeholder="Enter express delivery time in days"
              />
            </div>
            <div className="events-edit__price">
              <strong>Express Price</strong>
              <input
                type="number"
                min={1}
                value={expressPrice}
                onChange={(e) => setExpressPrice(e.target.value)}
              />
              <img src="/img/dollar.svg" alt="dollar" />
            </div>
          </div>
          {error && (
            <p
              style={{
                color: "red",
                display: "block",
                width: "100% ",
                margin: "0",
              }}
            >
              *Please fill all fields
            </p>
          )}
        </div>
        <div className="events-edit__btns">
          <button
            onClick={() => router.push("/event-types")}
            className="events-edit__btns-cancel"
          >
            Cancel
          </button>
          <button
            className="events-edit__btns-save"
            style={{
              position: "relative",
            }}
            // onClick={handleSave}
          >
            {loading && <Loading />}Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsEventTypeAsync;
