// libraries
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
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

  // router
  const router = useRouter();

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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: state.isFocused ? "#9FA8B5" : "#9FA8B5",
      minHeight: "40px",
      height: "40px",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "40px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "40px",
    }),
  };

  return (
    <form className={styles.form}>
      <label>
        <strong>Title</strong>
        <input type="text" />
      </label>
      <label>
        <strong>Length</strong>
        <Select
          styles={customStyles}
          className={styles.length_select}
          options={[
            { value: "30", label: "30 min" },
            { value: "60", label: "60 min" },
            { value: "90", label: "90 min" },
            { value: "120", label: "120 min" },
          ]}
        />
        {/* <select>
          <option value="30">30 min</option>
          <option value="60">60 min</option>
          <option value="90">90 min</option>
          <option value="120">120 min</option>
        </select> */}
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
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className={styles.save}
        >
          Save
        </button>
        <button
          className={styles.cancel}
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default index;
