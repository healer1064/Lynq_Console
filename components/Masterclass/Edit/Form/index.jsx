// libraries
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";
import "react-datepicker/dist/react-datepicker.css";

// context
import ProfileContext from "@/context/profile";

// requests
import { listingPriceReq } from "@/utils/requests/calls/template";

// components
import Loading from "@/components/common/Loading";

const index = ({ handleSubmit, buttonLoading, data }) => {
  // context
  const { token, profile } = useContext(ProfileContext);

  // states
  const [title, setTitle] = useState(data.name || "");
  const [duration, setDuration] = useState(
    { value: data.duration.toString(), label: `${data.duration} min` } || "",
  );
  const [price, setPrice] = useState(data.price || "");
  const [listingPrice, setListingPrice] = useState("");
  const [date, setDate] = useState(new Date(data.date) || null);
  const [description, setDescription] = useState(data.description);
  const [loading, setLoading] = useState(false);
  const [pickerDay, setPicker] = useState(new Date(data.date) || null);
  const [priceError, setPriceError] = useState(false);

  // router
  const router = useRouter();

  // handle price change
  useEffect(() => {
    if (price !== "") {
      setLoading(true);
      listingPriceReq(token, price)
        .then((res) => {
          setLoading(false);
          setListingPrice(res.total);
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
          onChange={(e) => setDuration(e)}
          defaultValue={duration}
        />
      </label>
      <label>
        <strong>Date</strong>
        <DatePicker
          minDate={moment().toDate()}
          selected={pickerDay}
          dateFormat='MM/dd/yyyy h:mm aa'
          showTimeInput
          onChange={(date) => {
            setPicker(date);
            setDate(moment(date).toISOString());
          }}
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
      {priceError && (
        <p className={styles.price_error}>The price must be atleast $1.</p>
      )}
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
      <div className={styles.btns}>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (
              title != "" &&
              duration &&
              date &&
              price != "" &&
              description != ""
            ) {
              if (!profile.can_create_free_activity) {
                if (price > 0) {
                  setPriceError(false);
                  handleSubmit({
                    name: title,
                    date,
                    duration: duration.value,
                    price,
                    revenue: 0,
                    description,
                  });
                } else {
                  setPriceError(true);
                }
              } else {
                setPriceError(false);
                handleSubmit({
                  name: title,
                  date,
                  duration: duration.value,
                  price,
                  revenue: 0,
                  description,
                });
              }
            } else {
              toast.info("Please fill all fields.");
            }
          }}
          className={styles.save}
        >
          {buttonLoading ? <Loading /> : "Save"}
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
