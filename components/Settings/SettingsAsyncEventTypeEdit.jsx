// libraries
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BsInfoCircleFill, BsFillPlusCircleFill } from "react-icons/bs";
import { ImBin2 } from "react-icons/im";

// context
import ProfileContext from "../../context/profile";

// components
import Loading from "../common/Loading";

const SettingsAsyncEventTypeEdit = ({ eventType }) => {
  // states
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [infoCount, setInfoCount] = useState(0);
  const [eventName, setEventName] = useState("");
  const [desc, setDesc] = useState("");
  const [info, setInfo] = useState("");
  const [standardDelivery, setStandardDelivery] = useState("");
  const [standardPrice, setStandardPrice] = useState("");
  const [expressDelivery, setExpressDelivery] = useState("");
  const [expressPrice, setExpressPrice] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // listing price for both
  const [standardListingPrice, setStandardListingPrice] = useState(null);
  const [expressListingPrice, setExpressListingPrice] = useState(null);
  // listing loading for both
  const [expressListingLoading, setExpressListingLoading] = useState(false);
  const [standardListingLoading, setStandardLisitngLoading] = useState(false);
  // show premium packgafe
  const [showPremium, setShowPremium] = useState(false);

  // context
  const { token } = useContext(ProfileContext);

  // router
  const router = useRouter();

  useEffect(() => {
    setEventName(eventType.name);
    setDesc(eventType.description);
    setInfo(eventType.clientNeeds);
    if (eventType.packages.length == 1) {
      setStandardDelivery(eventType.packages[0].delivery);
      setStandardPrice(eventType.packages[0].price);
      console.log(eventType.packages[0].displayPrice);
    }
    if (eventType.packages.length == 2) {
      setShowPremium(true);
      setStandardDelivery(eventType.packages[0].delivery);
      setStandardPrice(eventType.packages[0].price);
      setStandardListingPrice(
        eventType.packages[0].displayPrice && eventType.packages[0].displayPrice
      );
      setExpressDelivery(eventType.packages[1].delivery);
      setExpressPrice(eventType.packages[1].price);
      setExpressListingPrice(eventType.packages[1].displayPrice);
    }
  }, []);

  useEffect(() => {
    findExpressListingPrice();
  }, [expressPrice]);

  useEffect(() => {
    findStandarListingPrice();
  }, [standardPrice]);

  const handleSave = () => {
    if (
      eventName !== "" &&
      desc !== "" &&
      info !== "" &&
      standardDelivery !== "" &&
      standardPrice !== ""
    ) {
      if (showPremium) {
        if (expressDelivery !== "" && expressPrice !== "") {
          setError(false);
          setLoading(true);
          addEventType();
        } else {
          setError(true);
        }
      } else {
        setError(false);
        setLoading(true);
        addEventType();
      }
    } else {
      setError(true);
    }
  };

  const addEventType = () => {
    const standard = {
      name: "Standard",
      price: standardPrice,
      delivery: standardDelivery,
    };
    const express = {
      name: "Express",
      price: expressPrice,
      delivery: expressDelivery,
    };

    const _reqData = {
      name: eventName,
      description: desc,
      client_needs: info,
      packages: showPremium ? [standard, express] : [standard],
      enabled: eventType.enabled,
    };

    async function add() {
      const response = await fetch(
        `https://api.lynq.app/async/type/${eventType.id}?t=${token}`,
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

    add()
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          console.log("Event type added", res);
          router.push("/event-types");
          toast.success("Updated successfully");
        } else {
          console.log("Error Event type added", res);
          toast.error("An error has occurred");
        }
      })
      .catch(() => toast.error("An error has occurred"));
  };

  const findStandarListingPrice = async () => {
    if (standardPrice != "") {
      setStandardLisitngLoading(true);

      async function get() {
        const response = await fetch(
          `https://api.lynq.app/account/event-type/simulate?t=${token}&price=${standardPrice}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        setStandardListingPrice(await response.json());
        return await response;
      }

      get()
        .then((res) => {
          setStandardLisitngLoading(false);
          if (res.status != 200) {
            toast.error("An error has occurred");
          }
        })
        .catch(() => {
          toast.error("An error has occurred");
        });
    } else {
      setStandardListingPrice(null);
    }
  };

  const findExpressListingPrice = async () => {
    if (expressPrice != "") {
      setExpressListingLoading(true);

      async function get() {
        const response = await fetch(
          `https://api.lynq.app/account/event-type/simulate?t=${token}&price=${expressPrice}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        setExpressListingPrice(await response.json());

        return await response;
      }

      get()
        .then((res) => {
          setExpressListingLoading(false);
          if (res.status != 200) {
            toast.error("An error has occurred");
          }
        })
        .catch(() => {
          toast.error("An error has occurred");
        });
    } else {
      setExpressListingPrice(null);
    }
  };

  return (
    <div className="events-wrp">
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
                  findStandarListingPrice();
                }}
              />
              <img src="/img/dollar.svg" alt="dollar" />
            </div>
          </div>
          {/* <div className="events-edit__price"> */}
          <div className="event-type-async-price-time">
            <div className="events-edit__price" />
            <div className="events-edit__list">
              <div
                style={{ marginTop: "-15px", marginBottom: "15px" }}
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
                {standardListingLoading ? (
                  <img
                    style={{ width: "18px", height: "18px", marginTop: "5px" }}
                    src="/img/Rolling-dark.svg"
                    alt="rolling"
                  />
                ) : (
                  <h3>
                    {standardListingPrice
                      ? `$${standardListingPrice.simulated_price}`
                      : "Please enter price above to get listing price"}
                  </h3>
                )}
              </div>
            </div>
          </div>
          {showPremium && (
            <>
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
                      findExpressListingPrice();
                    }}
                  />
                  <img src="/img/dollar.svg" alt="dollar" />
                </div>
              </div>
              <div className="event-type-async-price-time">
                <div className="events-edit__price" />
                <div className="events-edit__list">
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
                          The price a customer pays to purchase the service and
                          that includes Lynq's fees.
                        </h6>
                        <p>Fees are based on your subscription plan on Lynq</p>
                      </div>
                    </h3>
                    {expressListingLoading ? (
                      <img
                        style={{
                          width: "18px",
                          height: "18px",
                          marginTop: "5px",
                        }}
                        src="/img/Rolling-dark.svg"
                        alt="rolling"
                      />
                    ) : (
                      <h3>
                        {expressListingPrice
                          ? `$${expressListingPrice.simulated_price}`
                          : "Please enter price above to get listing price"}
                      </h3>
                    )}
                  </div>
                  <br />
                </div>
              </div>
            </>
          )}

          {showPremium ? (
            <span
              onClick={() => setShowPremium(false)}
              className="add-remove-premium"
            >
              <ImBin2 size={18} /> <span>Remove express delivery option</span>
            </span>
          ) : (
            <span
              onClick={() => setShowPremium(true)}
              className="add-remove-premium"
            >
              <BsFillPlusCircleFill size={18} color="#7E88F4" />{" "}
              <span>Add an express delivery option</span>
            </span>
          )}
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

export default SettingsAsyncEventTypeEdit;
