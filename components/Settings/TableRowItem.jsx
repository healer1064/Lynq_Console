// libraries
import { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";

const TableRowItem = ({ item, deleteTime, day, token }) => {
  // states
  const [delLoading, setDelLoading] = useState(false);
  const [startTime, setStartTime] = useState(item.start_period_time);
  const [endTime, setEndTime] = useState(item.end_period_time);

  useEffect(() => {
    updateTime(day, startTime, endTime);
  }, [startTime, endTime]);

  const updateTime = (day, start, end) => {
    // setAddLoading(true);
    const _reqData = {
      day,
      start_period_time: start,
      end_period_time: end,
    };

    async function update() {
      const response = await fetch(
        `https://api.lynq.app/account/working-slots/${item.id}?t=${token}`,
        {
          method: "PUT",
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
      // setAddLoading(false);
      if (res.status == 200) {
        console.log("public profile updates", res);
        // toggleSuccess();
      } else {
        console.log("public profile update error", res);
        // toast.error("An error has occurred");
      }
    });
  };

  return (
    <div style={{ margin: ".25rem 0" }}>
      <Fade collapse bottom duration={1000}>
        <div className="time__row">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <div className="line"></div>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <div className="icon-wrapper">
            {!delLoading ? (
              <img
                src="/img/setup-trash.svg"
                alt="delete time slot"
                onClick={() => {
                  setDelLoading(true);
                  deleteTime(item.id);
                }}
              />
            ) : (
              <img
                style={{ width: "18px", height: "18px" }}
                src="/img/Rolling-dark.svg"
                alt="rolling"
              />
            )}
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default TableRowItem;