import moment from "moment";

import { dateIsBetween, formatTime, compareDates } from "./dates";

const groupListInSectionsByDate = (_data) => {
  var groupArrays = [];

  if (_data.length > 0) {
    const groups = _data.reduce((groups, appointment) => {
      const date = appointment.starting_date
        ? moment(appointment.starting_date).format("YYYY-MM-DD")
        : moment(appointment.date).format("YYYY-MM-DD");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(appointment);
      return groups;
    }, {});

    groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        appointments: groups[date],
      };
    });
  }
  return groupArrays;
};

const getCurrentDaySessions = (_data, day) => {
  const filteredArray = groupListInSectionsByDate(_data).filter((i) => {
    var currentDate = moment(day).format("YYYY-MM-DD");
    var date = moment(i.date).format("YYYY-MM-DD");
    return date == currentDate;
  });
  return filteredArray;
};

const getHomeCurrentSession = (_data, _setData) => {
  let format = "hh:mm A";
  _data.forEach((appt) => {
    if (
      dateIsBetween(
        appt.starting_date ? appt.starting_date : appt.date,
        appt.ending_date
          ? appt.ending_date
          : moment(appt.date).add(appt.duration, "minutes"),
      )
    ) {
      _setData({
        time: `${formatTime(
          appt.starting_date ? appt.starting_date : appt.date,
          format,
        )} - ${formatTime(
          appt.ending_date
            ? appt.ending_date
            : moment(appt.date).add(appt.duration, "minutes"),
          format,
        )}`,
        id: appt.id,
        name: appt.activity_name ? appt.activity_name : appt.name,
        type: appt.activity_name ? "Live session" : "Masterclass",
      });
    }
  });
};

const getHomeNextSession = (_data, _setData) => {
  let format = "hh:mm A";
  let time = moment();
  _data.sort(compareDates);
  for (let i = 0; i < _data.length; i++) {
    let start = _data[i].starting_date
      ? moment(_data[i].starting_date)
      : moment(_data[i].date);
    let end = _data[i].ending_date
      ? moment(_data[i].ending_date)
      : moment(_data[i].date).add(_data[i].duration, "minutes");
    if (time.isBefore(start, end)) {
      _setData({
        time: time.isSame(start, "day")
          ? `${start.format(format)} - ${end.format(format)}`
          : `${start.format(format)} - ${end.format(format)} ${start.format(
              "MMM DD YYYY",
            )}`,
        id: _data[i].id,
        name: _data[i].activity_name ? _data[i].activity_name : _data[i].name,
        type: _data[i].activity_name ? "Live session" : "Masterclass",
      });

      break;
    }
  }
};

const sortCalendarList = (_list) => {
  const sortList = (list, order) => {
    if (order === 1)
      return list.sort((a, b) => new Date(a.date) - new Date(b.date));
    else return list.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  let currentDate = new Date();
  let nextAppointments = _list.filter(
    (item) => new Date(item.date) >= currentDate,
  );
  let prevAppointments = _list.filter(
    (item) => new Date(item.date) < currentDate,
  );
  nextAppointments = sortList(nextAppointments, 1);
  prevAppointments = sortList(prevAppointments, 2);
  let sortedList = nextAppointments.concat(prevAppointments);
  return sortedList;
};

const handleFileInput = (_file) => {
  if (_file) {
    // if (_file.size > 1536 * 1000000) {
    //   toast("File size cannot exceed more than 1.5GB");
    // } else {
    return {
      url: URL.createObjectURL(_file),
      fileObject: _file,
    };
  }
};
// };

const paginateArray = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

const timeDifferenceInMilliSeconds = (_date) => {
  var now = new Date(_date);
  var then = new Date();

  var ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(
    moment(then, "DD/MM/YYYY HH:mm:ss"),
  );
  var d = moment.duration(ms);
  return d;
};

const getLatestMessage = (arr) => {
  return arr
    .map((item) => {
      const obj =
        item.content.length > 0
          ? {
              ...item,
              sentDate: item.content.sort((a, b) => {
                return new Date(b.sentDate) - new Date(a.sentDate);
              })[0].sentDate,
            }
          : { ...item, sentDate: item.requestDate };
      return obj;
    })
    .sort((a, b) => {
      return new Date(b.sentDate) - new Date(a.sentDate);
    });
};

function hashCode(str) {
  // java String#hashCode
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

export {
  groupListInSectionsByDate,
  getCurrentDaySessions,
  getHomeCurrentSession,
  getHomeNextSession,
  sortCalendarList,
  handleFileInput,
  paginateArray,
  timeDifferenceInMilliSeconds,
  getLatestMessage,
  hashCode,
  intToRGB,
};
