// libraries
import React from "react";
import moment from "moment";

const Item = ({ setTime, time, index, pIndex, itemIndex, setItemIndex }) => {
  return (
    <button
      style={{
        background: `${
          itemIndex == index + " " + pIndex ? "#7E88F4" : "white"
        }`,
        color: `${itemIndex == index + " " + pIndex ? "white" : "#7E88F4"}`,
      }}
      onClick={(e) => {
        e.preventDefault();
        setTime(time);
        setItemIndex(`${index} ${pIndex}`);
      }}
    >
      {moment(time).format("hh:mm a")}
    </button>
  );
};

export default Item;
