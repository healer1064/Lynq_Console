import moment from "moment";

const AppointmentTimeButton = ({
  setTime,
  time,
  index,
  pIndex,
  itemIndex,
  setItemIndex,
}) => {
  return (
    <button
      style={{
        background: `${
          itemIndex == index + " " + pIndex ? "#7E88F4" : "white"
        }`,
        color: `${itemIndex == index + " " + pIndex ? "white" : "#7E88F4"}`,
      }}
      onClick={() => {
        setTime(time);
        setItemIndex(`${index} ${pIndex}`);
      }}
    >
      {moment(time).format("hh:mm a")}
    </button>
  );
};

export default AppointmentTimeButton;
