// libraries
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import { listingPriceReq } from "@/utils/requests/calls/template";

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [price, setPrice] = useState("");
  const [listingPrice, setListingPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // handle price change
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
    <form className={styles.form}>
      <label>
        <strong>Title</strong>
        <input type="text" />
      </label>
      <label>
        <strong>Length</strong>
        <select>
          <option value="30">30 min</option>
          <option value="60">60 min</option>
          <option value="90">90 min</option>
          <option value="120">120 min</option>
        </select>
      </label>
      <label>
        <strong>Date</strong>
        <select>
          <option value="30">30 min</option>
          <option value="60">60 min</option>
          <option value="90">90 min</option>
          <option value="120">120 min</option>
        </select>
      </label>
      <label>
        <strong>Price</strong>
        <div className={styles.price}>
          <img
            className={styles.price_img}
            src="/img/dollar.svg"
            alt="dollar"
          />
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ paddingLeft: "25px" }}
          />
        </div>
      </label>
      <label>
        <strong>Listing Price</strong>
        <div className={styles.price}>
          <img
            className={styles.price_img}
            src="/img/dollar.svg"
            alt="dollar"
          />
          <input
            type="number"
            min="0"
            disabled
            value={loading ? "" : listingPrice}
            style={{ paddingLeft: "25px" }}
          />
          {loading && (
            <img
              className={styles.listing_loading}
              src="/img/Rolling-dark.svg"
              alt="rolling"
            />
          )}
        </div>
      </label>
      <label className={styles.description}>
        <strong>Description</strong>
        <textarea
          maxLength="600"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <span className={styles.desc_count}>{description.length}/600</span>
      </label>
      <div className={styles.btns}>
        <button className={styles.save}>Save</button>
        <button className={styles.cancel}>Cancel</button>
      </div>
    </form>
  );
};

export default index;
