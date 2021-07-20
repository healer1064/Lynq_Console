// libraries
import { useState, useEffect } from "react";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import Fade from "react-reveal/Fade";

// styles
import styles from "./styles.module.sass";

// requests
import { putUpdateSlotReq } from "@/utils/requests/settings/availabilities";

const TableRowItem = ({ item, deleteTime, day, token, toggleSuccess }) => {
  // states
  const [delLoading, setDelLoading] = useState(false);
  const [startTime, setStartTime] = useState(
    moment(`2013-11-18 ${item.start.toString()}`).format("HH:mm"),
  );
  const [endTime, setEndTime] = useState(
    moment(`2013-11-18 ${item.end.toString()}`).format("HH:mm"),
  );

  useEffect(() => {
    updateTime(day, startTime, endTime);
  }, [startTime, endTime]);

  const updateTime = (day, start, end) => {
    let timezone = moment.tz.guess();
    putUpdateSlotReq(token, item.id, { start, end, timezone, day })
      .then((res) => {
        if (res.status != 200) {
          toast.error("Failed to update slot time.");
        } else {
          toggleSuccess();
          toggleSuccess();
          toggleSuccess();
        }
      })
      .catch(() => toast.error("Failed to update slot time."));
  };

  return (
    <div style={{ margin: ".25rem 0" }}>
      <Fade collapse bottom duration={1000}>
        <div className={styles.time_row}>
          <input
            type='time'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <div className={styles.line}></div>
          <input
            type='time'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <div className={styles.icon_wrapper}>
            {!delLoading ? (
              <img
                src='/img/setup-trash.svg'
                alt='delete time slot'
                onClick={() => {
                  setDelLoading(true);
                  deleteTime(item.id);
                }}
              />
            ) : (
              <img
                style={{ width: "18px", height: "18px" }}
                src='/img/Rolling-dark.svg'
                alt='rolling'
              />
            )}
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default TableRowItem;
