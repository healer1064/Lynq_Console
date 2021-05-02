// libraries
import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsInfoCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";

// context
import ProfileContext from "../../context/profile";

// components
import Loading from "../common/Loading";

const SettingsEventTypeEdit = ({ eventType }) => {
  // states
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [needsCount, setNeedsCount] = useState(0);
  const [eventName, setEventName] = useState("");
  const [desc, setDesc] = useState("");
  const [needToBring, setNeedToBring] = useState("");
  const [duration, setDuration] = useState("");
  const [customDur, setCustomDur] = useState("");
  const [policy, setPolicy] = useState();
  const [price, setPrice] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listingPrice, setLisitngPrice] = useState(null);
  const [listingLoading, setLisitngLoading] = useState(false);

  // context
  const { token } = useContext(ProfileContext);

  // router
  const router = useRouter();

  useEffect(() => {
    setEventName(eventType.name);
    setDesc(eventType.description);
    setNeedToBring(eventType.material_needed);
    setDuration("custom");
    setCustomDur(eventType.duration);
    setPolicy(eventType.cancellation_policy);
    setPrice(eventType.price);
  }, []);

  useEffect(() => {
    if (price !== "" && price) {
      findListingPrice(price);
    }
  }, [price]);

  const handleEdit = () => {
    if (
      eventName !== "" &&
      desc !== "" &&
      duration !== "" &&
      policy !== "" &&
      price !== ""
    ) {
      if (duration === "custom" && customDur === "") {
        setError(true);
      } else {
        setLoading(true);
        setError(false);
        editEventType();
      }
    } else {
      setError(true);
    }
  };

  const editEventType = () => {
    const _reqData = {
      id: eventType.id,
      name: eventName,
      teacherId: "string",
      description: desc,
      duration: duration === "custom" ? customDur : duration,
      price,
      cancellation_policy: policy,
      material_needed: needToBring,
    };

    async function edit() {
      const response = await fetch(
        `https://api.lynq.app/account/event-type/${eventType.id}?t=${token}`,
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

    edit().then((res) => {
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

  const findListingPrice = async (price) => {
    if (price != "") {
      setLisitngLoading(true);
      async function get() {
        const response = await fetch(
          `https://api.lynq.app/account/event-type/simulate?t=${token}&price=${price}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        setLisitngPrice(await response.json());

        return await response;
      }

      get()
        .then((res) => {
          setLisitngLoading(false);
          if (res.status != 200) {
            toast.error("An error has occurred");
          }
        })
        .catch(() => {
          toast.error("An error has occurred");
        });
    }
  };

  return (
    <div className="events-wrp">
      <ToastContainer />
      <div className="events-edit">
        <h2>Edit Event Type</h2>
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
                maxLength="100"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                  setDescriptionCount(e.target.value.length);
                }}
                placeholder="100 Characters max"
              ></textarea>
              <div className="count">{descriptionCount}/100</div>
            </div>
          </div>
          <div className="events-edit__col need">
            <strong>What people need to bring</strong>
            <div className="events-edit__needs__textarea">
              <textarea
                maxlength="100"
                value={needToBring}
                onChange={(e) => {
                  setNeedsCount(e.target.value.length);
                  setNeedToBring(e.target.value);
                }}
                placeholder="100 Characters max"
              ></textarea>
              <div className="count">{needsCount}/100</div>
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
                checked={duration === "custom"}
                onClick={() => setDuration("custom")}
              />
              <div className="checkmark"></div>
              <input
                disabled={duration !== "custom"}
                type="text"
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
            <textarea
              value={policy}
              onChange={(e) => setPolicy(e.target.value)}
            ></textarea>
          </div>
          <div className="events-edit__price">
            <strong>Price*</strong>
            <input
              type="number"
              min={1}
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                // findListingPrice(e.target.value);
              }}
            />
            <img src="/img/dollar.svg" alt="dollar" />
          </div>
          <div className="events-edit__price" />
          <div className="listing-price-info-wrap">
            <h3>
              Listing Price{" "}
              <BsInfoCircleFill className="listing-price-info-icon" />
              <div className="listing-price-info">
                <h6>
                  The price a customer pays to purchase the service and that
                  includes Lynq's fees.
                </h6>
                <p>Fees are based on your subscription plan on Lynq</p>
              </div>
            </h3>
            {listingLoading ? (
              <img
                style={{ width: "18px", height: "18px", marginTop: "5px" }}
                src="/img/Rolling-dark.svg"
                alt="rolling"
              />
            ) : (
              <h3>
                {listingPrice
                  ? `$${listingPrice.simulated_price}`
                  : "Please enter price above to get listing price"}
              </h3>
            )}
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
            onClick={handleEdit}
          >
            {loading && <Loading />}Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsEventTypeEdit;
