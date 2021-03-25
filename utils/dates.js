const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const fullDate = (dateString) => {
  const date = new Date(dateString);
  return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]}
   ${date.getDate()}, ${date.getFullYear()}`;
};

const timeAgo = (dateString) => {
  var dateNow = new Date();
  var dateFuture = new Date(dateString);

  var seconds = Math.floor((dateFuture - dateNow) / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  return (
    days +
    "d, " +
    hours +
    "h, " +
    minutes +
    "m (No 'created at' date field from in backend)"
  );
};

const fullDateWithoutDay = (d) => {
  const date = new Date(d);
  return `${monthNames[date.getMonth()]}
   ${date.getDate()}, ${date.getFullYear()}`;
};

const dayName = (date) => {
  var d = new Date(date.toString());
  return dayNames[d.getDay()];
};

function getTime(dateString) {
  var date = new Date(dateString);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
const getDuration = (sDate, eDate) => {
  const endDate = new Date(eDate);
  const startDate = new Date(sDate);

  var diff = (endDate.getTime() - startDate.getTime()) / 1000;
  diff /= 60;
  var dur = Math.abs(Math.round(diff));
  if (dur > 60) {
    return `${dur / 60} ${dur / 60 < 2 ? "hr" : "hrs"}`;
  } else {
    return `${dur} min`;
  }
};

export {
  monthNames,
  dayNames,
  fullDate,
  timeAgo,
  fullDateWithoutDay,
  dayName,
  getTime,
  getDuration,
};
