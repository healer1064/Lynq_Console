// libraries
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "antd";

// styles
import styles from "./styles.module.sass";

// icons
import { BsExclamationCircleFill } from "react-icons/bs";

// context
import ProfileContext from "@/context/profile";

// requests
import { listingPriceReq } from "@/utils/requests/calls/template";
import {
  postMessageTemplate,
  putMessageTemplate,
} from "@/utils/requests/messages";

const index = ({ setState }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [days, setDays] = useState("");
  const [price, setPrice] = useState("");
  const [listingPrice, setListingPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // get listing prce
  useEffect(() => {
    if (price !== "") {
      setLoading(true);
      listingPriceReq(token, price)
        .then((res) => {
          setLoading(false);
          setListingPrice(res.simulated_price);
        })
        .catch(() => {
          setLoading(false);
          toast.error("Failed to fetch listing price!");
        });
    } else {
      setListingPrice("");
    }
  }, [price]);

  // handle click
  const handleSave = () => {
    const reqData = {
      name: "string",
      description,
      enabled: true,
      maxResponseDelay: days,
      price,
    };
    if (data.length > 0) {
      putMessageTemplate(token, data[0].id, reqData)
        .then((res) => {
          if (res.status) {
            toast.error("Failed to change status");
          } else {
            responseRefresh();
            setState(1);
          }
        })
        .catch(() => toast.error("Failed to change status"));
    } else {
      postMessageTemplate(token, reqData)
        .then((res) => {
          if (res.status) {
            toast.error("Failed to change status");
          } else {
            responseRefresh();
            setState(1);
          }
        })
        .catch(() => toast.error("Failed to change status"));
    }
  };

  return (
    <div className={styles.content}>
      <label>
        Max response time
        <span>
          <input
            value={days}
            onChange={(e) => setDays(e.target.value)}
            type='number'
          />
          <span className={styles.days_label}>days</span>
        </span>
      </label>
      <label>
        Price
        <span>
          <img src='/img/dollar.svg' alt='dollar' />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type='number'
          />
        </span>
      </label>
      <label className={styles.listing}>
        <h6>
          Listing Price{" "}
          <Tooltip
            className={styles.tooltip}
            title="The price a customer pays to purchase the service and that
            includes Lynq's fees."
          >
            <BsExclamationCircleFill />
          </Tooltip>
        </h6>
        {price && (
          <span>
            <img src='/img/dollar.svg' alt='dollar' />
            <input disabled value={listingPrice} />
            {loading && (
              <img
                className={styles.loading}
                src='/img/Rolling-dark.svg'
                alt='rolling'
              />
            )}
          </span>
        )}
      </label>
      <div className={styles.desc_box}>
        <label htmlFor='desc'>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id='desc'
          maxLength='300'
        ></textarea>
        <span>{description.length}/300</span>
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default index;
