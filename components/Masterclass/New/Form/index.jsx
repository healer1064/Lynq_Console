// libraries
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import { toast } from "react-toastify";

// fake
const fake = {
  "2021-06-25": [
    "2021-06-25T16:00:00+05:00",
    "2021-06-25T16:15:00+05:00",
    "2021-06-25T16:30:00+05:00",
    "2021-06-25T16:45:00+05:00",
    "2021-06-25T17:00:00+05:00",
    "2021-06-25T17:15:00+05:00",
    "2021-06-25T17:30:00+05:00",
    "2021-06-25T17:45:00+05:00",
    "2021-06-25T18:00:00+05:00",
    "2021-06-25T18:15:00+05:00",
    "2021-06-25T18:30:00+05:00",
    "2021-06-25T18:45:00+05:00",
    "2021-06-25T19:00:00+05:00",
    "2021-06-25T19:15:00+05:00",
    "2021-06-25T19:30:00+05:00",
    "2021-06-25T19:45:00+05:00",
    "2021-06-25T20:00:00+05:00",
    "2021-06-25T20:15:00+05:00",
    "2021-06-25T20:30:00+05:00",
    "2021-06-25T20:45:00+05:00",
    "2021-06-25T21:00:00+05:00",
    "2021-06-25T21:15:00+05:00",
    "2021-06-25T21:30:00+05:00",
    "2021-06-25T21:45:00+05:00",
    "2021-06-25T22:00:00+05:00",
    "2021-06-25T22:15:00+05:00",
    "2021-06-25T22:30:00+05:00",
    "2021-06-25T22:45:00+05:00",
    "2021-06-25T12:30:00+05:00",
    "2021-06-25T12:45:00+05:00",
    "2021-06-25T13:00:00+05:00",
    "2021-06-25T13:15:00+05:00",
    "2021-06-25T13:30:00+05:00",
    "2021-06-25T13:45:00+05:00",
    "2021-06-25T14:00:00+05:00",
    "2021-06-25T14:15:00+05:00",
    "2021-06-25T14:30:00+05:00",
    "2021-06-25T14:45:00+05:00",
    "2021-06-25T15:00:00+05:00",
    "2021-06-25T15:15:00+05:00",
    "2021-06-25T15:30:00+05:00",
    "2021-06-25T15:45:00+05:00",
    "2021-06-25T09:00:00+05:00",
    "2021-06-25T09:15:00+05:00",
    "2021-06-25T09:30:00+05:00",
    "2021-06-25T09:45:00+05:00",
    "2021-06-25T10:00:00+05:00",
    "2021-06-25T10:15:00+05:00",
    "2021-06-25T10:30:00+05:00",
    "2021-06-25T10:45:00+05:00",
    "2021-06-25T11:00:00+05:00",
    "2021-06-25T11:15:00+05:00",
    "2021-06-25T11:30:00+05:00",
    "2021-06-25T11:45:00+05:00",
    "2021-06-25T12:00:00+05:00",
    "2021-06-25T12:15:00+05:00",
  ],
  "2021-06-24": [
    "2021-06-24T15:30:00+05:00",
    "2021-06-24T15:45:00+05:00",
    "2021-06-24T16:00:00+05:00",
    "2021-06-24T16:15:00+05:00",
    "2021-06-24T16:30:00+05:00",
    "2021-06-24T16:45:00+05:00",
    "2021-06-24T17:00:00+05:00",
    "2021-06-24T17:15:00+05:00",
    "2021-06-24T17:30:00+05:00",
    "2021-06-24T17:45:00+05:00",
    "2021-06-24T18:00:00+05:00",
    "2021-06-24T18:15:00+05:00",
    "2021-06-24T18:30:00+05:00",
    "2021-06-24T18:45:00+05:00",
    "2021-06-24T19:00:00+05:00",
    "2021-06-24T12:15:00+05:00",
    "2021-06-24T19:15:00+05:00",
    "2021-06-24T12:30:00+05:00",
    "2021-06-24T12:45:00+05:00",
    "2021-06-24T19:30:00+05:00",
    "2021-06-24T13:00:00+05:00",
    "2021-06-24T19:45:00+05:00",
    "2021-06-24T13:15:00+05:00",
    "2021-06-24T20:00:00+05:00",
    "2021-06-24T13:30:00+05:00",
    "2021-06-24T20:15:00+05:00",
    "2021-06-24T13:45:00+05:00",
    "2021-06-24T20:30:00+05:00",
    "2021-06-24T14:00:00+05:00",
    "2021-06-24T20:45:00+05:00",
    "2021-06-24T14:15:00+05:00",
    "2021-06-24T21:00:00+05:00",
    "2021-06-24T21:15:00+05:00",
    "2021-06-24T21:30:00+05:00",
    "2021-06-24T21:45:00+05:00",
    "2021-06-24T15:00:00+05:00",
    "2021-06-24T15:15:00+05:00",
    "2021-06-24T09:00:00+05:00",
    "2021-06-24T09:15:00+05:00",
    "2021-06-24T09:30:00+05:00",
    "2021-06-24T09:45:00+05:00",
    "2021-06-24T10:00:00+05:00",
    "2021-06-24T10:15:00+05:00",
    "2021-06-24T10:30:00+05:00",
    "2021-06-24T10:45:00+05:00",
    "2021-06-24T11:00:00+05:00",
    "2021-06-24T11:15:00+05:00",
    "2021-06-24T11:30:00+05:00",
    "2021-06-24T11:45:00+05:00",
    "2021-06-24T12:00:00+05:00",
  ],
  "2021-06-23": [
    "2021-06-23T15:30:00+05:00",
    "2021-06-23T15:45:00+05:00",
    "2021-06-23T16:00:00+05:00",
    "2021-06-23T16:15:00+05:00",
    "2021-06-23T16:30:00+05:00",
    "2021-06-23T16:45:00+05:00",
    "2021-06-23T17:00:00+05:00",
    "2021-06-23T17:15:00+05:00",
    "2021-06-23T17:30:00+05:00",
    "2021-06-23T17:45:00+05:00",
    "2021-06-23T18:00:00+05:00",
    "2021-06-23T18:15:00+05:00",
    "2021-06-23T18:30:00+05:00",
    "2021-06-23T18:45:00+05:00",
    "2021-06-23T19:00:00+05:00",
    "2021-06-23T19:15:00+05:00",
    "2021-06-23T19:30:00+05:00",
    "2021-06-23T19:45:00+05:00",
    "2021-06-23T20:00:00+05:00",
    "2021-06-23T20:15:00+05:00",
    "2021-06-23T20:30:00+05:00",
    "2021-06-23T20:45:00+05:00",
    "2021-06-23T21:00:00+05:00",
    "2021-06-23T21:15:00+05:00",
    "2021-06-23T21:30:00+05:00",
    "2021-06-23T21:45:00+05:00",
    "2021-06-23T12:15:00+05:00",
    "2021-06-23T12:30:00+05:00",
    "2021-06-23T12:45:00+05:00",
    "2021-06-23T13:00:00+05:00",
    "2021-06-23T13:15:00+05:00",
    "2021-06-23T13:30:00+05:00",
    "2021-06-23T13:45:00+05:00",
    "2021-06-23T14:00:00+05:00",
    "2021-06-23T14:15:00+05:00",
    "2021-06-23T14:30:00+05:00",
    "2021-06-23T14:45:00+05:00",
    "2021-06-23T15:00:00+05:00",
    "2021-06-23T15:15:00+05:00",
    "2021-06-23T09:00:00+05:00",
    "2021-06-23T09:15:00+05:00",
    "2021-06-23T09:30:00+05:00",
    "2021-06-23T09:45:00+05:00",
    "2021-06-23T10:00:00+05:00",
    "2021-06-23T10:15:00+05:00",
    "2021-06-23T10:30:00+05:00",
    "2021-06-23T10:45:00+05:00",
    "2021-06-23T11:00:00+05:00",
    "2021-06-23T11:15:00+05:00",
    "2021-06-23T11:30:00+05:00",
    "2021-06-23T11:45:00+05:00",
    "2021-06-23T12:00:00+05:00",
  ],
  "2021-06-22": [
    "2021-06-22T15:30:00+05:00",
    "2021-06-22T15:45:00+05:00",
    "2021-06-22T16:00:00+05:00",
    "2021-06-22T16:15:00+05:00",
    "2021-06-22T16:30:00+05:00",
    "2021-06-22T16:45:00+05:00",
    "2021-06-22T17:00:00+05:00",
    "2021-06-22T17:15:00+05:00",
    "2021-06-22T17:30:00+05:00",
    "2021-06-22T17:45:00+05:00",
    "2021-06-22T18:00:00+05:00",
    "2021-06-22T18:15:00+05:00",
    "2021-06-22T18:30:00+05:00",
    "2021-06-22T18:45:00+05:00",
    "2021-06-22T19:00:00+05:00",
    "2021-06-22T19:15:00+05:00",
    "2021-06-22T19:30:00+05:00",
    "2021-06-22T19:45:00+05:00",
    "2021-06-22T20:00:00+05:00",
    "2021-06-22T20:15:00+05:00",
    "2021-06-22T20:30:00+05:00",
    "2021-06-22T20:45:00+05:00",
    "2021-06-22T21:00:00+05:00",
    "2021-06-22T21:15:00+05:00",
    "2021-06-22T21:30:00+05:00",
    "2021-06-22T21:45:00+05:00",
    "2021-06-22T12:15:00+05:00",
    "2021-06-22T12:30:00+05:00",
    "2021-06-22T12:45:00+05:00",
    "2021-06-22T13:00:00+05:00",
    "2021-06-22T13:15:00+05:00",
    "2021-06-22T13:30:00+05:00",
    "2021-06-22T13:45:00+05:00",
    "2021-06-22T14:00:00+05:00",
    "2021-06-22T14:15:00+05:00",
    "2021-06-22T14:30:00+05:00",
    "2021-06-22T14:45:00+05:00",
    "2021-06-22T15:00:00+05:00",
    "2021-06-22T15:15:00+05:00",
    "2021-06-22T09:00:00+05:00",
    "2021-06-22T09:15:00+05:00",
    "2021-06-22T09:30:00+05:00",
    "2021-06-22T09:45:00+05:00",
    "2021-06-22T10:00:00+05:00",
    "2021-06-22T10:15:00+05:00",
    "2021-06-22T10:30:00+05:00",
    "2021-06-22T10:45:00+05:00",
    "2021-06-22T11:00:00+05:00",
    "2021-06-22T11:15:00+05:00",
    "2021-06-22T11:30:00+05:00",
    "2021-06-22T11:45:00+05:00",
    "2021-06-22T12:00:00+05:00",
  ],
};

// styles
import styles from "./styles.module.sass";
import "react-datepicker/dist/react-datepicker.css";

// context
import ProfileContext from "@/context/profile";

// requests
import { listingPriceReq } from "@/utils/requests/calls/template";

// components
import Slots from "../Slots";

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [price, setPrice] = useState("");
  const [listingPrice, setListingPrice] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [pickerDay, setPicker] = useState();
  const [time, setTime] = useState();
  const [times, setTimes] = useState([]);
  const [prevDisable, setPrevDisable] = useState(false);

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

  useEffect(() => {
    setTimes(sortDates(fake));
  }, []);

  useEffect(() => {
    if (moment(date).format("MM-DD-YYYY") === moment().format("MM-DD-YYYY")) {
      setPrevDisable(true);
    } else {
      setPrevDisable(false);
    }
  }, [date]);

  const handleNextArrow = () => {
    setDate(moment(date).add(2, "days").toString());
  };
  const handlePrevArrow = () => {
    if (moment(date) < moment().toDate()) {
      setDate(moment().toDate());
    } else {
      if (moment(date).subtract(2, "days") < moment().toDate()) {
        setDate(moment().toDate());
      } else {
        setDate(moment(date).subtract(2, "days").toString());
      }
    }
  };

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

  const sortDates = (_data) => {
    let newArr = [];

    // conver to arary
    Object.entries(_data).map((item) => {
      newArr.push({ date: item[0], slots: item[1] });
    });

    // sort
    newArr.sort((a, b) => new Date(a.date) - new Date(b.date));

    return newArr;
  };

  useEffect(() => {
    if (time) {
      setPicker(new Date(time));
    }
  }, [time]);

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
      </label>
      <label>
        <strong>Date</strong>
        <DatePicker
          minDate={moment().toDate()}
          selected={pickerDay}
          dateFormat={time ? "MM/dd/yyyy h:mm aa" : "MM/dd/yyyy"}
          onChange={(date) => {
            setPicker(date);
            setDate(moment(date));
            setTime(null);
          }}
        />
      </label>
      {date && !time && (
        <Slots
          times={times}
          setTime={setTime}
          handleNextArrow={handleNextArrow}
          handlePrevArrow={handlePrevArrow}
          prevDisable={prevDisable}
        />
      )}
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
        <div className={`${styles.price} ${styles.listing}`}>
          <img
            className={styles.price_img}
            src="/img/dollar.svg"
            alt="dollar"
          />
          {loading ? (
            <img
              className={styles.listing_loading}
              src="/img/Rolling-dark.svg"
              alt="rolling"
            />
          ) : (
            <input
              type="number"
              min="0"
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
