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

  let format = `${start[1]}-${end[1]} ${end[0]} ${start[2]}`;

  return format;
};
