// libraries
import { useState, useContext, useEffect } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import { Tooltip } from "antd";

// styles
import styles from "./styles.module.sass";
import "react-datepicker/dist/react-datepicker.css";

// context
import ProfileContext from "@/context/profile";

// requests
import { listingPriceReq } from "@/utils/requests/calls/template";

// icons
import { BsExclamationCircleFill } from "react-icons/bs";

const index = ({ type, setType }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
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
      paddingLeft: "24px",
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

  const handleChange = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  const handleInputChange = (inputValue, actionMeta) => {
    console.group("Input Changed");
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  return (
    <form className={styles.form}>
      <label>
        <strong>Title</strong>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <strong>Type</strong>
        <Select
          styles={customStyles}
          className={styles.length_select}
          options={[
            { value: "Video", label: "Video" },
            { value: "Picture", label: "Picture" },
            { value: "Document", label: "Document" },
          ]}
          defaultValue={type}
          onChange={(e) => setType(e.value)}
        />
      </label>
      <label>
        <strong>
          Category <span>(Optional)</span>{" "}
          <Tooltip
            title='You can add several items in a same category. This
helps your clients navigate on your public pofile'
          >
            <BsExclamationCircleFill />
          </Tooltip>
        </strong>

        <CreatableSelect
          styles={customStyles}
          className={styles.length_select}
          isClearable
          onChange={handleChange}
          onInputChange={handleInputChange}
          placeholder='Type or select...'
          options={[
            { value: "Test 1", label: "Test 1" },
            { value: "Test 2", label: "Test 2" },
            { value: "Test 3", label: "Test 3" },
          ]}
        />
      </label>
      <label>
        <strong>Price</strong>
        <div className={styles.price}>
          <img
            className={styles.price_img}
            src='/img/dollar.svg'
            alt='dollar'
          />
          <input
            type='number'
            min='0'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ paddingLeft: "25px" }}
          />
        </div>
      </label>
      <label>
        <strong>Listing Price</strong>
        <div className={`${styles.price} ${styles.listing}`}>
          <img
            className={styles.price_img}
            src='/img/dollar.svg'
            alt='dollar'
          />
          {loading ? (
            <img
              className={styles.listing_loading}
              src='/img/Rolling-dark.svg'
              alt='rolling'
            />
          ) : (
            <input
              type='number'
              min='0'
              disabled
              value={loading ? "" : listingPrice}
              style={{ paddingLeft: "25px" }}
            />
          )}
        </div>
      </label>
      <label className={styles.description}>
        <strong>Description</strong>
        <textarea
          maxLength='600'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <span className={styles.desc_count}>{description.length}/600</span>
      </label>
    </form>
  );
};

export default index;
