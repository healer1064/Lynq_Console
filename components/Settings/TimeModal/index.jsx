import { useState } from "react";
import { TimePicker } from "antd";
import { Modal } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

import style from "./TimeModal.module.css";

const TimeModal = ({ isOpen, toggle, handleTime, defaultTime, editTime }) => {
  const [startTime, setStartTime] = useState(
    defaultTime?.startTime?.format ?? ""
  );
  const [endTime, setEndTime] = useState(defaultTime?.endTime?.format ?? "");
  const [error, setError] = useState(false);

  const handleStart = (_time, _timeString) => {
    setStartTime(_timeString);
    setError(false);
  };

  const handleEnd = (_time, _timeString) => {
    setEndTime(_timeString);
    setError(false);
  };

  const handleOk = () => {
    if (startTime !== "" && endTime !== "") {
      if (defaultTime === null) {
        handleTime(startTime, endTime);
      } else {
        editTime(defaultTime.id, startTime, endTime);
      }
    } else {
      setError(true);
    }
  };

  return (
    <Modal
      title={defaultTime === null ? "Set Up Working Hour" : "Edit Working Hour"}
      centered
      visible={isOpen}
      onOk={handleOk}
      onCancel={toggle}
      default
      cancelButtonProps={{ style: { display: "none" } }}
      okText={defaultTime === null ? "Set Time" : "Edit Time"}
    >
      <div className={style.modal__body}>
        <div className={style.modal__input}>
          <span>Start Time</span>
          <TimePicker
            use12Hours
            format="hh:mm a"
            onChange={handleStart}
            defaultValue={
              defaultTime !== null
                ? moment()
                    .hour(defaultTime.startTime.hour)
                    .minute(defaultTime.startTime.minute)
                : null
            }
          />
        </div>
        <div className={style.modal__input}>
          <span>End Time</span>
          <TimePicker
            use12Hours
            format="hh:mm a"
            onChange={handleEnd}
            defaultValue={
              defaultTime !== null
                ? moment()
                    .hour(defaultTime.endTime.hour)
                    .minute(defaultTime.endTime.minute)
                : null
            }
          />
        </div>
      </div>
      {error && <p className={style.modal__error}>*Please select both time</p>}
    </Modal>
  );
};

export default TimeModal;
