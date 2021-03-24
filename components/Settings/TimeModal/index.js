import { useState } from "react";
import { TimePicker } from "antd";
import { Modal } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

import style from "./TimeModal.module.css";

const TimeModal = ({ isOpen, toggle, handleTime }) => {
  const [startTime, setStartTime] = useState("09:00 am");
  const [endTime, setEndTime] = useState("05:00 pm");
  const [error, setError] = useState(false);

  const handleStart = (_time, _timeString) => {
    console.log(_time, _timeString);
    setStartTime(_timeString);
    setError(false);
  };

  const handleEnd = (_time, _timeString) => {
    console.log(_time, _timeString);
    setEndTime(_timeString);
    setError(false);
  };

  const handleOk = () => {
    if (startTime !== "" && endTime !== "") {
      handleTime(startTime, endTime);
    } else {
      setError(true);
    }
  };

  return (
    <Modal
      title="Set Up Working Hour"
      centered
      visible={isOpen}
      onOk={handleOk}
      onCancel={toggle}
      default
      cancelButtonProps={{ style: { display: "none" } }}
      okText="Set Time"
    >
      <div className={style.modal__body}>
        <div className={style.modal__input}>
          <span>Start Time</span>
          <TimePicker
            use12Hours
            format="hh:mm a"
            onChange={handleStart}
            defaultValue={moment().hour(9).minute(0)}
          />
        </div>
        <div className={style.modal__input}>
          <span>End Time</span>
          <TimePicker
            use12Hours
            format="hh:mm a"
            onChange={handleEnd}
            defaultValue={moment().hour(17).minute(0)}
          />
        </div>
      </div>
      {error && <p className={style.modal__error}>*Please select both time</p>}
    </Modal>
  );
};

export default TimeModal;
