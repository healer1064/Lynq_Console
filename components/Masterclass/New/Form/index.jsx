// libraries
import { useState } from "react";

// styles
import styles from "./styles.module.sass";

// components
import Dropzone from "../Dropzone";

const index = () => {
  // states
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

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
            //   value={price}
            //   onChange={(e) => {
            //     setPrice(e.target.value);
            //     findListingPrice(e.target.value);
            //   }}
            style={{ paddingLeft: "25px" }}
          />
        </div>
        <div className={styles.listing_price}>
          <h3>Listing Price</h3>
          <h3>$30</h3>
          {/* {listingLoading ? (
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
          )} */}
        </div>
      </label>
      <Dropzone state={file} setState={setFile} />
      <label className={styles.description}>
        <strong>Description</strong>
        <textarea
          maxLength="300"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <span className={styles.desc_count}>{description.length}/300</span>
      </label>
      <div className={styles.btns}>
        <button className={styles.save}>Save</button>
        <button className={styles.cancel}>Cancel</button>
      </div>
    </form>
  );
};

export default index;
