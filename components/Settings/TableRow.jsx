// libraries
// import moment from "moment";
import { useState, useEffect, useContext } from "react";
import Fade from "react-reveal/Fade";
import ProfileContext from "../../context/profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment-timezone";

// components
import TableRowItem from "./TableRowItem";

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

  const toggleAvailability = (day) => {
    setAvailLoading(true);
    async function toggle() {
      const response = await fetch(
        `https://api.lynq.app/account/working-slots/toggle-enable?t=${token}&day=${day}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return await response;
    }

    toggle().then((res) => {
      setAvailLoading(false);
      if (res.status == 200) {
        console.log("avail changed");
        toggleSuccess();
        setIsAvailable(!isAvailable);
      } else {
        toast.error("An error has occurred");
      }
    });
  };

  const addTime = (day, start, end) => {
    setAddLoading(true);

    const _reqData = {
      day,
      start_period_time:
        // moment
        //   .tz(`2013-11-18 ${start}`, moment.tz.guess())
        //   .format()
        //   .split("T")[1],
        new Date(`2013-11-18 ${start}`).toISOString().split("T")[1],
      end_period_time: new Date(`2013-11-18 ${end}`)
        .toISOString()
        .split("T")[1],

      // moment
      //   .tz(`2013-11-18 ${end}`, moment.tz.guess())
      //   .format()
      //   .split("T")[1]
    };

    async function update() {
      const response = await fetch(
        `https://api.lynq.app/account/working-slots?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(_reqData),
        }
      );

      return await response;
    }

    update().then((res) => {
      setAddLoading(false);
      if (res.status == 200) {
        console.log("public profile updates", res);
        toggleSuccess();
      } else {
        console.log("public profile update error", res);
        toast.error("An error has occurred");
      }
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
      <ToastContainer />
      {!isAvailable ? (
        <Fade duration={1000}>
          <div className="setup-table__row">
            <div className="setup-table__day">
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
            <div className="setup-table__col">
              <span className="unavailable">Unavailable</span>
            </div>
            <div className="setup-table__add">
              {/* <img src="/img/setup-add.svg" alt="" /> */}
            </div>
          </div>
        </Fade>
      ) : (
        <div className="setup-table__row available">
          <div className="setup-table__day">
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
          <div className="setup-table__col">
            {!timeSlots ? (
              <h6>Loading</h6>
            ) : (
              timeSlots.map((item, i) => (
                <TableRowItem
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
            className="setup-table__add"
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
