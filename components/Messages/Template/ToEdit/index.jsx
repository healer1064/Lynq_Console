// libraries
import { useState, useEffect } from "react";
import { Tooltip } from "antd";

// icons
import { BsExclamationCircleFill } from "react-icons/bs";

// styles
import styles from "./styles.module.sass";

// requests
import { listingPriceReq } from "@/utils/requests/calls/template";

const index = ({ setState, data }) => {
  // states
  const [price, setPrice] = useState(
    data[0] ? (data[0].price ? data[0].price : 0) : 0,
  );
  const [listingPrice, setListingPrice] = useState(0);
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

  return (
    <div className={styles.content}>
      <label>
        Max response time{" "}
        <span>
          {data[0]
            ? data[0].maxResponseDelay
              ? data[0].maxResponseDelay
              : 0
            : 0}{" "}
          days
        </span>
      </label>
      <label>
        Price <span>${data[0] ? (data[0].price ? data[0].price : 0) : 0}</span>
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
        </h6>{" "}
        <span>
          {loading ? (
            <img
              className={styles.loading}
              src='/img/Rolling-dark.svg'
              alt='rolling'
            />
          ) : (
            `$${listingPrice}`
          )}
        </span>
      </label>
      <div className={styles.desc_box}>
        <label htmlFor='desc'>Description</label>
        <textarea
          disabled
          id='desc'
          maxLength='300'
          value={
            data[0] ? (data[0].description ? data[0].description : "") : ""
          }
        ></textarea>
      </div>
      <button onClick={() => setState(0)}>Edit</button>
    </div>
  );
};

export default index;
