// import moment from "moment";
import moment from "moment-timezone";

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
  let time = moment(_date).format("hh:mm a");
  return time;
};

export const changeTo24 = (_time) => {
  return {
    hour: moment(_time, ["h:mm a"]).format("HH"),
    minute: moment(_time, ["h:mm a"]).format("mm"),
  };
};

export const dateIsBetween = (_start, _end) => {
  if (isSame(_start)) {
    let currentTime = moment(formatTime(moment()), "hh:mm:ss");
    let start = moment(formatTime(_start), "hh:mm:ss");
    let end = moment(formatTime(_end), "hh:mm:ss");
    return currentTime.isBetween(start, end);
  }

  if (isBefore(_start)) {
    return true;
  }
  return false;
};

export const isBefore = (_date) => {
  let startTime = moment(_date);
  let check = startTime.diff(moment(), "days");

  return check >= 0 ? true : false;
};

export const formatTime = (_time, _format = "hh:mm:ss") => {
  return moment(_time).format(_format);
};

const isSame = (_date) => {
  return moment(_date).isSame(new Date(), "day");
};

export const compareDates = (a, b) => {
  if (
    a.ending_date
      ? a.ending_date
      : moment(a.date).add(a.duration, "minutes") < b.ending_date
      ? b.ending_date
      : moment(b.date).add(b.duration, "minutes") ||
        (a.ending_date
          ? a.ending_date
          : moment(a.date).add(a.duration, "minutes") == b.ending_date
          ? b.ending_date
          : moment(b.date).add(b.duration, "minutes") && a.starting_date
          ? a.starting_date
          : a.date > b.starting_date
          ? b.starting_date
          : b.date)
  )
    return -1;
  if (
    a.ending_date
      ? a.ending_date
      : moment(a.date).add(a.duration, "minutes") > b.ending_date
      ? b.ending_date
      : moment(b.date).add(b.duration, "minutes") ||
        (a.ending_date
          ? a.ending_date
          : moment(a.date).add(a.duration, "minutes") == b.ending_date
          ? b.ending_date
          : moment(b.date).add(b.duration, "minutes") && a.starting_date
          ? a.starting_date
          : a.date < b.starting_date
          ? b.starting_date
          : b.date)
  )
    return 1;
  return 0;
};

export const filterByCurrWeek = (_list) => {
  let { weekStart, weekEnd } = getCurrentWeek();

  let filter = _list.filter(
    (item) =>
      new Date(item.date).getTime() >= weekStart.getTime() &&
      new Date(item.date).getTime() <= weekEnd.getTime()
  );

  return filter;
};
