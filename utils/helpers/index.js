import moment from "moment";

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
  handleFileInput,
  paginateArray,
  timeDifferenceInMilliSeconds,
  getLatestMessage,
};
