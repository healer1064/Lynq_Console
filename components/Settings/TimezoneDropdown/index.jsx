import Select from "react-select";

// data
import timezones from "../../../utils/data/timezones";

const TimezoneDropdown = ({ state, setState }) => {
  return (
    <Select
      style={{ widht: "100%" }}
      className="basic-single"
      classNamePrefix="select"
      isClearable
      isSearchable
      options={timezones}
      defaultValue={timezones.find((t) => t.value == state)}
      onChange={(e) => setState(e.value)}
    />
  );
};
export default TimezoneDropdown;
