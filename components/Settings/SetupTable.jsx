// libraries
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import ProfileContext from "../../context/profile";
import PageLoading from "../common/PageLoading";

// components
import TableRow from "./TableRow";

const SetupTable = ({ data, toggleSuccess }) => {
  // use context
  const { token } = useContext(ProfileContext);

  const updateTime = (day, start, end) => {
    const _reqData = [
      {
        id: "",
        uid: "",
        day,
        start_period_time: start /* as "18:00:00" */,
        end_period_time: end,
      },
    ];

    async function update() {
      const response = await fetch(
        `https://api.lynq.app/account/working-slots?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(_reqData),
        }
      );

      return await response;
    }

    update().then((res) => {
      if (res.status == 200) {
        console.log("public profile updates", res);
        toggleSuccess();
      } else {
        console.log("public profile update error", res);
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
          <TableRow
            day="Sun"
            data={filterData("sunday")}
            updateTime={updateTime}
          />
          <TableRow
            day="Mon"
            data={filterData("monday")}
            updateTime={updateTime}
          />
          <TableRow
            day="Tue"
            data={filterData("tuesday")}
            updateTime={updateTime}
          />
          <TableRow
            day="Wed"
            data={filterData("wednesday")}
            updateTime={updateTime}
          />
          <TableRow
            day="Thu"
            data={filterData("thursday")}
            updateTime={updateTime}
          />
          <TableRow
            day="Fri"
            data={filterData("friday")}
            updateTime={updateTime}
          />
          <TableRow
            day="Sat"
            data={filterData("saturday")}
            updateTime={updateTime}
          />
        </>
      )}
    </div>
  );
};

export default SetupTable;
