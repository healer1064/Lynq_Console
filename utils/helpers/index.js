import moment from "moment";

import { dateIsBetween, formatTime, compareDates } from "./dates";

const groupListInSectionsByDate = (_data) => {
  var groupArrays = [];

  if (_data.length > 0) {
    const groups = _data.reduce((groups, appointment) => {
      const date = moment(appointment.starting_date).format("YYYY-MM-DD");
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

  const filteredArray = groupArrays.filter((i) => {
    var currentDate = moment().format("YYYY-MM-DD");
    var date = moment(i.date).format("YYYY-MM-DD");
    return date == currentDate;
  });

  return filteredArray;
};

const getHomeCurrentSession = (_data) => {
  let format = "hh:mm A";
  _data.forEach((appt) => {
    if (dateIsBetween(appt.starting_date, appt.ending_date)) {
      return {
        time: `${formatTime(appt.starting_date, format)} - ${formatTime(
          appt.ending_date,
          format
        )}`,
        id: appt.id,
        name: appt.activity_name,
      };
    }
  });
};

const getHomeNextSession = (_data, _setData) => {
  let format = "hh:mm A";
  let time = moment();
  _data.sort(compareDates);
  for (let i = 0; i < _data.length; i++) {
    let start = moment(_data[i].starting_date);
    let end = moment(_data[i].ending_date);

    if (time.isBefore(start, end)) {
      _setData({
        time: time.isSame(start, "day")
          ? `${start.format(format)} - ${end.format(format)}`
          : `${start.format(format)} - ${end.format(format)} ${start.format(
              "MMM DD YYYY"
            )}`,
        id: _data[i].id,
        name: _data[i].activity_name,
      });

      break;
    }
  }
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
    moment(then, "DD/MM/YYYY HH:mm:ss")
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

export {
  groupListInSectionsByDate,
  getHomeCurrentSession,
  getHomeNextSession,
  handleFileInput,
  paginateArray,
  timeDifferenceInMilliSeconds,
  getLatestMessage,
};
