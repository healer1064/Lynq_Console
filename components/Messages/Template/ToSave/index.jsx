// libraries
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import { listingPriceReq } from "@/utils/requests/calls/template";

const index = ({ setState }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [days, setDays] = useState(0);
  const [price, setPrice] = useState(0);
  const [listingPrice, setListingPrice] = useState(0);
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
      setListingPrice(0);
    }
  }, [price]);

  return (
    <div className={styles.content}>
      <label>
        Max response time
        <span>
          <input
            value={days}
            onChange={(e) => setDays(e.target.value)}
            type="number"
          />
          <span className={styles.days_label}>days</span>
        </span>
      </label>
      <label>
        Price
        <span>
          <img src="/img/dollar.svg" alt="dollar" />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
        </span>
      </label>
      <label>
        Listing Price
        <span className={styles.listing}>
          <img src="/img/dollar.svg" alt="dollar" />
          <input disabled value={listingPrice} />
          {loading && (
            <img
              className={styles.loading}
              src="/img/Rolling-dark.svg"
              alt="rolling"
            />
          )}
        </span>
      </label>
      <div className={styles.desc_box}>
        <label htmlFor="desc">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="desc"
          maxLength="300"
        ></textarea>
        <span>{description.length}/300</span>
      </div>
      <button onClick={() => setState(1)}>Save</button>
    </div>
  );
};

export default index;
