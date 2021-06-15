// libraries
import { useState, useEffect, useContext } from "react";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import Fade from "react-reveal/Fade";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import {
  postToggleSlotReq,
  postAddSlotReq,
} from "@/utils/requests/settings/availabilities";

// components
import Item from "./Item";

const TableRow = ({ day, data, deleteTime, toggleSuccess }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [isAvailable, setIsAvailable] = useState(
    data.length > 0 ? data[0].active : false
  );
  const [timeSlots, setTimeSlots] = useState(null);
  const [availLoading, setAvailLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  // handle day availability toggle
  const toggleAvailability = (day) => {
    setAvailLoading(true);
    postToggleSlotReq(token, day)
      .then((res) => {
        setAvailLoading(false);
        if (res.status == 200) {
          setIsAvailable(!isAvailable);
          toggleSuccess();
        } else {
          toast.error("Failed to toggle availability.");
        }
      })
      .catch(() => {
        setAvailLoading(false);
        toast.error("Failed to toggle availability.");
      });
  };

  // handle add slot
  const addTime = (day, start, end) => {
    setAddLoading(true);
    let timezone = moment.tz.guess();
    postAddSlotReq(token, { start, end, timezone, day })
      .then((res) => {
        setAddLoading(false);
        if (res.status == 200) {
          toggleSuccess();
        } else {
          toast.error("Failed to add the slot.");
        }
      })
      .catch(() => {
        toast.error("Failed to add the slot.");
      });
  };

  useEffect(() => {
    checkPreviousSlots();
  }, [isAvailable]);

  useEffect(() => {
    if (data) setTimeSlots(data);
  }, [data]);

  const checkPreviousSlots = () => {
    if (data.length > 0) {
      setTimeSlots(data);
    } else {
      if (isAvailable) {
        addTime(day, `09:00`, "17:00");
      }
    }
  };

  return (
    <>
      {!isAvailable ? (
        <Fade duration={1000}>
          <div className={styles.row}>
            <div className={styles.day}>
              {!availLoading ? (
                <img
                  src="/img/setup-check-unavailable.svg"
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    toggleAvailability(day);
                  }}
                />
              ) : (
                <img
                  style={{ width: "18px", height: "18px" }}
                  src="/img/Rolling-dark.svg"
                  alt="rolling"
                />
              )}
              <span>{day.substring(0, 3)}</span>
            </div>
            <div className={styles.col}>
              <span className={styles.unavailable}>Unavailable</span>
            </div>
            <div className={styles.add}></div>
          </div>
        </Fade>
      ) : (
        <div className={`${styles.row} ${styles.available}`}>
          <div className={styles.day}>
            {!availLoading ? (
              <img
                src="/img/setup-check-available.svg"
                alt=""
                style={{ cursor: "pointer" }}
                onClick={() => {
                  toggleAvailability(day);
                }}
              />
            ) : (
              <img
                style={{ width: "18px", height: "18px" }}
                src="/img/Rolling-dark.svg"
                alt="rolling"
              />
            )}
            <span>{day.substring(0, 3)}</span>
          </div>
          <div className={styles.col}>
            {!timeSlots ? (
              <h6>Loading</h6>
            ) : (
              timeSlots.map((item, i) => (
                <Item
                  key={i}
                  item={item}
                  deleteTime={deleteTime}
                  day={day}
                  token={token}
                />
              ))
            )}
          </div>
          <div
            className={styles.add}
            onClick={() => addTime(day, "09:00", "17:00")}
          >
            {!addLoading ? (
              <img src="/img/setup-add.svg" alt="" />
            ) : (
              <img
                style={{ width: "18px", height: "18px" }}
                src="/img/Rolling-dark.svg"
                alt="rolling"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TableRow;
