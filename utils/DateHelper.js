import moment from "moment";

export const getCurrentWeek = () => {
  const weekStart = moment().startOf("week").toDate();
  const weekEnd = moment().endOf("week").toDate();

  return {
    weekStart,
    weekEnd,
  };
};

export const getPreviousWeek = (_prev) => {
  const weekStart = moment(new Date(_prev))
    .subtract(1, "weeks")
    .startOf("week")
    .toDate();
  const weekEnd = moment(new Date(_prev))
    .subtract(1, "weeks")
    .endOf("week")
    .toDate();

  return {
    weekStart,
    weekEnd,
  };
};

export const getNextWeek = (_next) => {
  const weekStart = moment(new Date(_next))
    .add(1, "weeks")
    .startOf("week")
    .toDate();
  const weekEnd = moment(new Date(_next))
    .add(1, "weeks")
    .endOf("week")
    .toDate();

  return {
    weekStart,
    weekEnd,
  };
};

export const dateFormat = (_sdate, _edate) => {
  let start = moment(_sdate).format("MMMM DD YYYY");
  let end = moment(_edate).format("MMMM DD YYYY");

  start = start.split(" ");
  end = end.split(" ");

  if (_sdate.getTime() === _edate.getTime()) {
    return `${start[1]} ${start[0]} ${start[2]}`;
  } else {
    if (start[0] === end[0]) {
      return `${start[1]}-${end[1]} ${start[0]} ${start[2]}`;
    } else {
      return `${start[1]} ${moment(_sdate).format("MMM")} - ${end[1]} ${moment(
        _edate
      ).format("MMM")}  ${start[2]}`;
    }
  }
};

export const getDayAndMonth = (_date) => {
  let date = moment(_date);

  let month = date.format("MMM");
  let dayName = date.format("ddd");
  let day = date.format("DD");

  return {
    month,
    dayName,
    day,
  };
};

export const getFormatedTime = (_date) => {
  let date = moment(_date);
  let time = date.utc().format("h:mm A");
  return time;
};
