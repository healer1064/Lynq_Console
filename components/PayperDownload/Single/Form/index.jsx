// libraries
import { useState, useContext, useEffect } from "react";
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

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [price] = useState(10);
  const [listingPrice, setListingPrice] = useState("");
  const [description] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  );
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
        <input type='text' disabled value='Test' />
      </label>
      <label>
        <strong>Type</strong>
        <input type='text' disabled value='Video' />
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
        <input type='text' disabled value='Test1' />
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
            value={10}
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
        <textarea disabled maxLength='600' value={description}></textarea>
        <span className={styles.desc_count}>{description.length}/600</span>
      </label>
    </form>
  );
};

export default index;
