// libraries
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import ProfileContext from "../../context/profile";
import PageLoading from "../common/PageLoading";

// components
import TableRow from "./TableRow";

const days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const SetupTable = ({ data, toggleSuccess }) => {
  // use context
  const { token } = useContext(ProfileContext);

  const deleteTime = (_id) => {
    async function remove() {
      const response = await fetch(
        `https://api.lynq.app/account/working-slots/${_id}?t=${token}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return await response;
    }

    remove().then((res) => {
      if (res.status == 200) {
        console.log("slots deleted");
        toggleSuccess();
      } else {
        toast.error("An error has occurred");
      }
    });
  };

  const filterData = (day) => {
    const slots = data.filter((i) => i.day.toLowerCase() == day);
    return slots;
  };

  return (
    <div className="setup-table">
      {!data ? (
        <div style={{ height: "40vh" }}>
          <PageLoading />
        </div>
      ) : (
        <>
          <ToastContainer />
          <div className="setup-table__title">Set your weekly hours</div>
          {days.map((day, index) => {
            return (
              <TableRow
                key={index}
                day={day}
                data={filterData(day.toLowerCase())}
                deleteTime={deleteTime}
                toggleSuccess={toggleSuccess}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default SetupTable;
