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
    const slots = data.filter((i) => i?.day?.toLowerCase() == day);
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
            day="SUNDAY"
            data={filterData("sunday")}
            updateTime={updateTime}
            deleteTime={deleteTime}
          />
          <TableRow
            day="MONDAY"
            data={filterData("monday")}
            updateTime={updateTime}
            deleteTime={deleteTime}
          />
          <TableRow
            day="TUESDAY"
            data={filterData("tuesday")}
            updateTime={updateTime}
            deleteTime={deleteTime}
          />
          <TableRow
            day="WEDNESDAY"
            data={filterData("wednesday")}
            updateTime={updateTime}
            deleteTime={deleteTime}
          />
          <TableRow
            day="THURSDAY"
            data={filterData("thursday")}
            updateTime={updateTime}
            deleteTime={deleteTime}
          />
          <TableRow
            day="FRIDAY"
            data={filterData("friday")}
            updateTime={updateTime}
            deleteTime={deleteTime}
          />
          <TableRow
            day="SATURDAY"
            data={filterData("saturday")}
            updateTime={updateTime}
            deleteTime={deleteTime}
          />
        </>
      )}
    </div>
  );
};

export default SetupTable;
