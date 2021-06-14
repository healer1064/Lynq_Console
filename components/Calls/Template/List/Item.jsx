// libraries
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// icons
import { BsCircleFill, BsCircle } from "react-icons/bs";
import { BiDollar } from "react-icons/bi";

// requests
import { listingPriceReq } from "@/utils/requests/calls/template";

const Item = ({ data, options, setOptions }) => {
  // context
  const { token } = useContext(ProfileContext);

  // state
  const [price, setPrice] = useState(0);
  const [listingPrice, setListingPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // handle click
  const onClick = (_data) => {
    const obj = { ..._data, status: !_data.status, price };
    const arr = options.map((_item) => {
      return _item.id == _data.id ? obj : _item;
    });
    setOptions(arr);
  };

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
    const obj = { ...data, price };
    const arr = options.map((item) => {
      return item.id == data.id ? obj : item;
    });
    setOptions(arr);
  }, [listingPrice]);

  return (
    <div
      className={`${styles.item} ${data.status ? styles.active : ""}`}
      onClick={() => onClick(data)}
    >
      {data.status ? <BsCircleFill /> : <BsCircle />}
      <div>
        <h6>{data.length} min</h6>
        {data.status && (
          <div className={styles.price}>
            <label onClick={(e) => e.stopPropagation()} htmlFor="price">
              Price
              <span>
                <BiDollar />
                <input
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                />
              </span>
            </label>
            <span>
              Listing price:{" "}
              {loading ? (
                <img src="/img/Rolling-dark.svg" alt="rolling" />
              ) : (
                `$${listingPrice}`
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
