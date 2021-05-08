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

const SettingsEventTypeAsync = () => {
  // states
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [infoCount, setInfoCount] = useState(0);
  const [eventName, setEventName] = useState("");
  const [desc, setDesc] = useState("");
  const [info, setInfo] = useState("");
  const [standardDelivery, setStandardDelivery] = useState(7);
  const [standardPrice, setStandardPrice] = useState();
  const [expressDelivery, setExpressDelivery] = useState();
  const [expressPrice, setExpressPrice] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listingPrice, setLisitngPrice] = useState(null);
  const [standardList, setStandardList] = useState(null);
  const [listingLoading, setLisitngLoading] = useState(false);
  const [standardListing, setStandardLisitng] = useState(false);

  // context
  const { token } = useContext(ProfileContext);

  // router
  const router = useRouter();

  const handleSave = () => {
    if (
      eventName !== "" &&
      desc !== "" &&
      info !== "" &&
      standardDelivery !== "" &&
      standardPrice !== "" &&
      expressDelivery !== "" &&
      expressPrice !== ""
    ) {
      setError(true);
      setLoading(true);
      addEventType();
    } else {
      setError(true);
    }
  };

  const addEventType = () => {
    // "name": "string",
    // "userId": "string",
    // "packages": [
    //   {
    //     "id": "string",
    //     "name": "string",
    //     "price": 0
    //   }
    // ]

    const standard = {
      name: "Standard",
      price: standardPrice,
    };
    const express = {
      name: "Express",
      price: expressPrice,
    };

    const _reqData = {
      id: uuidv4(),
      name: eventName,
      description: desc,
      clientNeeds: info,
      packages: [standard, express],
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

    add()
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          console.log("Event type added", res);
        } else {
          console.log("Error Event type added", res);
          toast.error("An error has occurred");
        }
      })
      .then(() => toast.error("An error has occurred"));
  };

  const findListingPrice = async (e) => {
    if (e.target.value != "") {
      if (e.target.name == "standard") {
        setStandardLisitng(true);
      } else {
        setLisitngLoading(true);
      }

      async function get() {
        const response = await fetch(
          `https://api.lynq.app/account/event-type/simulate?t=${token}&price=${e.target.value}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (e.target.name == "standard") {
          setStandardList(await response.json());
        } else {
          setLisitngPrice(await response.json());
        }

        return await response;
      }

      get()
        .then((res) => {
          if (e.target.name == "standard") {
            setStandardLisitng(false);
          } else {
            setLisitngLoading(false);
          }
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
                name="standard"
                onChange={(e) => {
                  setStandardPrice(e.target.value);
                  // setStandardList(e.target.value);
                  findListingPrice(e);
                }}
              />
              <img src="/img/dollar.svg" alt="dollar" />
            </div>
          </div>
          {/* <div className="events-edit__price"> */}
          <div
            style={{ marginTop: "-15px" }}
            className="listing-price-info-wrap"
          >
            <h3>
              Listing Price{" "}
              <BsInfoCircleFill className="listing-price-info-icon" />
              <div
                style={{ top: "-80px", width: "100%" }}
                className="listing-price-info"
              >
                <h6>
                  The price a customer pays to purchase the service and that
                  includes Lynq's fees.
                </h6>
                <p>Fees are based on your subscription plan on Lynq</p>
              </div>
            </h3>
            {standardListing ? (
              <img
                style={{ width: "18px", height: "18px", marginTop: "5px" }}
                src="/img/Rolling-dark.svg"
                alt="rolling"
              />
            ) : (
              <h3>
                {standardList
                  ? `$${standardList.simulated_price}`
                  : "Please enter price above to get listing price"}
              </h3>
            )}
          </div>
          {/* </div> */}
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
                name="express"
                onChange={(e) => {
                  setExpressPrice(e.target.value);
                  // findListingPrice(e.target.value);
                  findListingPrice(e);
                }}
              />
              <img src="/img/dollar.svg" alt="dollar" />
            </div>
          </div>
          <div className="event-type-async-price-time">
            {/* <div className="events-edit__price"></div> */}
            {/* <div className="events-edit__price"> */}
            <div
              style={{ marginTop: "-15px" }}
              className="listing-price-info-wrap"
            >
              <h3>
                Listing Price{" "}
                <BsInfoCircleFill className="listing-price-info-icon" />
                <div
                  style={{ top: "-80px", width: "100%" }}
                  className="listing-price-info"
                >
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
            <br />
            {/* </div> */}
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

export default SettingsEventTypeAsync;