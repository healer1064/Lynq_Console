// libraries
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { BsInfoCircleFill } from "react-icons/bs";

// context
import ProfileContext from "../../context/profile";

// components
import Loading from "../common/Loading";

const SettingsEventTypeAdd = () => {
  // states
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [needsCount, setNeedsCount] = useState(0);
  const [eventName, setEventName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState();
  const [needToBring, setNeedToBring] = useState("");
  const [duration, setDuration] = useState("");
  const [customDur, setCustomDur] = useState("");
  const [policy, setPolicy] = useState(
    "- If the session is cancelled with 12 hours (or more) notice, then a full refund is given.\n- If the session is cancelled with less than 12 hours notice, no refund is given.\n- If you don't show for whatever reason, no refund is given."
  );
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

  const handleSave = () => {
    if (eventName !== "" && desc !== "" && duration !== "" && price !== "") {
      if (duration === "custom" && customDur === "") {
        console.log("false");
        setError(true);
      } else {
        setLoading(true);
        console.log("true");
        setError(false);
        addEventType();
      }
    } else {
      console.log("false");
      setError(true);
    }
  };

  const validatePolicy = () => {
    let policyStr = `- Full refund if cancelled ${hourOne} hours before the session`;

    if (isAddMore) {
      policyStr += `\n- ${per} % refund if cancelled up to ${hourTwo} hours before the session`;
    }

    return policyStr;
  };

  const addEventType = () => {
    const _reqData = {
      id: uuidv4(),
      name: eventName,
      teacherId: "string",
      description: desc,
      duration: duration === "custom" ? customDur : duration,
      price,
      cancellation_policy: validatePolicy(),
      material_needed: needToBring,
    };

    async function add() {
      const response = await fetch(
        `https://api.lynq.app/account/event-type?t=${token}`,
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
        router.push("/event-types");
      } else {
        console.log("Error Event type added", res);
        toast.error("An error has occurred");
      }
    });
  };

  return (
    <div className="events-wrp">
      <ToastContainer />
      <div className="events-edit">
        <h2>Add Event Type</h2>
        <div className="events-edit__inner">
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
            <strong>What people need to bring</strong>
            <div className="events-edit__needs__textarea">
              <textarea
                maxLength="300"
                value={needToBring}
                onChange={(e) => {
                  setNeedsCount(e.target.value.length);
                  setNeedToBring(e.target.value);
                }}
                placeholder="300 Characters max"
              ></textarea>
              <div className="count">{needsCount}/300</div>
            </div>
          </div>
          <div className="events-edit__col radios">
            <strong>Choose a duration</strong>
            <div className="radios__predefined">
              <label>
                <input
                  name="duration"
                  type="radio"
                  onChange={() => setDuration("15")}
                />
                <span>15 min</span>
                <div className="checkmark"></div>
              </label>
              <label>
                <input
                  name="duration"
                  type="radio"
                  onChange={() => setDuration("30")}
                />
                <span>30 min</span>
                <div className="checkmark"></div>
              </label>
              <label>
                <input
                  name="duration"
                  type="radio"
                  onChange={() => setDuration("60")}
                />
                <span>60 min</span>
                <div className="checkmark"></div>
              </label>
              <label>
                <input
                  name="duration"
                  type="radio"
                  onChange={() => setDuration("90")}
                />
                <span>90 min</span>
                <div className="checkmark"></div>
              </label>
            </div>
            <strong>Choose custom duration (In minutes)</strong>
            <label className="radios__custom">
              <input
                name="duration"
                type="radio"
                onClick={() => setDuration("custom")}
              />
              <div className="checkmark"></div>
              <input
                disabled={duration !== "custom"}
                type="number"
                min={1}
                placeholder="Example: 120 Min"
                value={customDur}
                onChange={(e) => {
                  if (duration !== "custom") {
                    setCustomDur("");
                  } else {
                    setCustomDur(e.target.value);
                  }
                }}
              />
            </label>
          </div>
          <div className="events-edit__col policy">
            <strong>Cancellation policy*</strong>
            {/* <textarea
              value={policy}
              onChange={(e) => setPolicy(e.target.value)}
            ></textarea> */}
            <div className="content">
              <p>
                Full refund if cancelled
                <input
                  style={{ margin: "0 5px" }}
                  type="number"
                  max="100"
                  min="0"
                  value={hourOne}
                  onChange={(e) => setHourOne(e.target.value)}
                />
                hours before the session
              </p>
              <>
                {!isAddMore ? (
                  <p
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => setIsAddMore(true)}
                  >
                    <img
                      src="/img/setup-add.svg"
                      alt=""
                      style={{ margin: "0 5px 0 -5px" }}
                    />{" "}
                    You can add one more rule
                  </p>
                ) : (
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="number"
                      max="100"
                      min="0"
                      style={{ margin: "0 5px 0 0" }}
                      value={per}
                      onChange={(e) => setPer(e.target.value)}
                    />
                    % refund if cancelled up to
                    <input
                      style={{ margin: "0 5px" }}
                      value={hourTwo}
                      type="number"
                      max="100"
                      min="0"
                      onChange={(e) => setHourTwo(e.target.value)}
                    />{" "}
                    hours before the session
                    <img
                      src="/img/events-delete-icon.svg"
                      alt=""
                      onClick={() => setIsAddMore(false)}
                      style={{ marginLeft: "10px" }}
                    />
                  </p>
                )}
              </>
            </div>
          </div>
          <div className="events-edit__price">
            <strong>Price*</strong>
            <input
              type="number"
              min={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <img src="/img/dollar.svg" alt="dollar" />
          </div>
          <div className="events-edit__price" />
          <div>
            <h3
              style={{
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              Listing Price{" "}
              <BsInfoCircleFill
                style={{ marginLeft: "10px", cursor: "pointer" }}
                color="#7a7a7a"
              />
            </h3>
            <h3
              style={{
                marginTop: "0px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                color: "#777",
              }}
            >
              $10
            </h3>
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
            onClick={handleSave}
          >
            {loading && <Loading />}Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsEventTypeAdd;
