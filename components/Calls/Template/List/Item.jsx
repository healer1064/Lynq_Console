// libraries
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "antd";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// icons
import {
  BsCircleFill,
  BsCircle,
  BsExclamationCircleFill,
} from "react-icons/bs";
import { BiDollar } from "react-icons/bi";

// requests
import { listingPriceReq } from "@/utils/requests/calls/template";

import Descriptions from "./Descriptions";
import { useCallback } from "react";
import { FaOldRepublic } from "react-icons/fa";

const Item = ({ data, options, setOptions }) => {
  // context
  const { token } = useContext(ProfileContext);

  // state
  const [price, setPrice] = useState(data.price);
  const [listingPrice, setListingPrice] = useState("");
  const [descriptions, setDescriptions] = useState(data.tags);
  const [loading, setLoading] = useState(false);
  const [oldPrice, setOldPrice] = useState(-1);

  useEffect(() => {
    setPrice(data.price);
  }, [data]);

  useEffect(() => {
    if (price) {
      setOptions((old) => {
        for (const d of old) {
          if (d?.id !== undefined && d.duration === data.duration) {
            console.log(d.price, price);
            if (d.price !== price) {
              d.updated = true;
            } else {
              d.updated = false;
            }
          }
        }
        data.price = price;
        return [...old];
      });
    }
  }, [price]);

  // handle click
  // const onClick = useCallback(() => {
  //   /* const obj = { ..._data, status: !_data.status, price };
  // 	const arr = options.map((_item) => {
  // 		return _item.id == _data.id ? obj : _item;
  // 	}); */
  //   setOptions((old) => {
  //     for (const d of old) {
  //       if (d.duration === data.duration) {
  //         d.status = !d.status;
  //         break;
  //       }
  //     }
  //     return [...old];
  //   });
  // }, [data]);

  const onClick = () => {
    /* const obj = { ..._data, status: !_data.status, price };
  	const arr = options.map((_item) => {
  		return _item.id == _data.id ? obj : _item;
  	}); */
    setOptions((old) => {
      for (const d of old) {
        if (d.duration === data.duration) {
          d.status = !d.status;
          break;
        }
      }
      return [...old];
    });
  };

  // handle price change
  useEffect(() => {
    if (price) {
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
    <div className={styles.item}>
      <div>
        <h6
          onClick={() => onClick()}
          className={data.status ? styles.active : ""}
        >
          {data.status ? <BsCircleFill /> : <BsCircle />} {data.duration} min
        </h6>
        {data.status && (
          <div className={styles.price}>
            <label onClick={(e) => e.stopPropagation()} htmlFor="price">
              <p>Price</p>
              <span>
                <BiDollar />
                <input
                  id="price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  type="number"
                />
              </span>
            </label>
            <label
              className={styles.listing}
              onClick={(e) => e.stopPropagation()}
              htmlFor="listing-price"
            >
              <p>
                Listing Price{" "}
                <Tooltip
                  className={styles.tooltip}
                  title="The price a customer pays to purchase the service and that
                  includes Lynq's fees."
                >
                  <BsExclamationCircleFill />
                </Tooltip>
              </p>
              {price != "" && (
                <span>
                  <BiDollar />
                  <input id="listing-price" value={listingPrice} disabled />
                  {loading && (
                    <img src="/img/Rolling-dark.svg" alt="rolling" />
                  )}{" "}
                </span>
              )}
            </label>
            <Descriptions
              value={data.tags}
              onChange={(tags) => {
                setOptions((old) => {
                  for (const d of old) {
                    if (d.id === data.id) {
                      d.tags = tags;
                      break;
                    }
                  }
                  console.log(old);
                  return [...old];
                });
              }}
              onDelete={(tags) => {
                setOptions((old) => {
                  for (const d of old) {
                    if (d.id === data.id) {
                      d.tags = tags;
                      break;
                    }
                  }
                  console.log(old);
                  return [...old];
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
